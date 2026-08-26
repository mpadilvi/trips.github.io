const FALLBACK_RATE = 362.55;
let currentRate = FALLBACK_RATE;

const formatEur = (value) => new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
}).format(value);

const formatHuf = (value) => new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 0,
}).format(value);

function updateConvertedPrices(rate) {
  document.querySelectorAll("[data-huf]").forEach((element) => {
    const huf = Number(element.dataset.huf);
    element.textContent = `${formatHuf(huf)} Ft · ${formatEur(huf / rate)}`;
  });

  document.querySelectorAll("[data-huf-total]").forEach((element) => {
    const huf = Number(element.dataset.hufTotal);
    element.textContent = `${formatHuf(huf)} Ft · ${formatEur(huf / rate)}`;
    const groupText = element.nextElementSibling;
    if (groupText) {
      groupText.textContent = `por persona · ${formatHuf(huf * 3)} Ft / ${formatEur((huf * 3) / rate)} el grupo`;
    }
  });
}

async function loadExchangeRate() {
  const status = document.querySelector("#fx-status");
  if (!status) return;
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=HUF");
    if (!response.ok) throw new Error("Respuesta no válida");
    const data = await response.json();
    currentRate = Number(data.rates.HUF);
    updateConvertedPrices(currentRate);
    status.textContent = `1 € = ${currentRate.toLocaleString("es-ES")} Ft · BCE, ${new Date(data.date).toLocaleDateString("es-ES")}.`;
    syncConverter("eur");
  } catch (error) {
    status.textContent = "Sin conexión: se usa 1 € = 362,55 Ft (BCE, 24 ago 2026).";
    updateConvertedPrices(FALLBACK_RATE);
  }
}

function syncConverter(source) {
  const eurInput = document.querySelector("#eur-input");
  const hufInput = document.querySelector("#huf-input");
  if (!eurInput || !hufInput) return;

  if (source === "eur") {
    hufInput.value = Math.round((Number(eurInput.value) || 0) * currentRate);
  } else {
    eurInput.value = ((Number(hufInput.value) || 0) / currentRate).toFixed(2);
  }
}

const weatherLabels = {
  0: "Despejado",
  1: "Casi despejado",
  2: "Parcialmente nuboso",
  3: "Cubierto",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna débil",
  53: "Llovizna",
  55: "Llovizna intensa",
  61: "Lluvia débil",
  63: "Lluvia",
  65: "Lluvia intensa",
  80: "Chubascos débiles",
  81: "Chubascos",
  82: "Chubascos fuertes",
  95: "Tormenta",
};

async function loadWeather() {
  const status = document.querySelector("#weather-status");
  const container = document.querySelector("#weather-days");
  if (!status || !container) return;

  const page = document.body.dataset;
  const params = new URLSearchParams({
    latitude: page.weatherLat || "47.4979",
    longitude: page.weatherLon || "19.0402",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: page.weatherTimezone || "Europe/Budapest",
    start_date: page.weatherStart || "2026-09-11",
    end_date: page.weatherEnd || "2026-09-14",
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fuera del horizonte disponible");
    const data = await response.json();
    if (!data.daily?.time?.length) throw new Error("Sin datos diarios");

    status.textContent = "Previsión disponible · se actualiza cada vez que abres la página.";
    container.replaceChildren(...data.daily.time.map((date, index) => {
      const card = document.createElement("div");
      card.className = "weather-day";
      const label = weatherLabels[data.daily.weather_code[index]] || "Variable";
      card.innerHTML = `<strong>${new Date(`${date}T12:00:00`).toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}</strong><span>${label}</span><b>${Math.round(data.daily.temperature_2m_max[index])}° / ${Math.round(data.daily.temperature_2m_min[index])}°</b><small>Lluvia ${data.daily.precipitation_probability_max[index] ?? 0}%</small>`;
      return card;
    }));
  } catch (error) {
    status.textContent = "Aún está fuera del horizonte de Open-Meteo. El widget mostrará automáticamente los cuatro días en cuanto estén disponibles.";
    container.replaceChildren();
  }
}

function setupMaps() {
  const dialog = document.querySelector("#map-dialog");
  const frame = document.querySelector("#map-frame");
  const title = document.querySelector("#map-title");
  const external = document.querySelector("#map-external");
  const close = document.querySelector(".map-close");
  if (!dialog || !frame || !title || !external) return;

  document.querySelectorAll(".map-button").forEach((button) => {
    button.addEventListener("click", () => {
      const query = button.dataset.map;
      title.textContent = button.dataset.label || "Mapa";
      frame.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
      external.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      dialog.showModal();
    });
  });

  close?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => { frame.src = "about:blank"; });
}

function setupRouteTabs() {
  const tabs = [...document.querySelectorAll("[data-route-target]")];
  const panels = [...document.querySelectorAll(".route-card[role='tabpanel']")];
  if (!tabs.length || !panels.length) return;

  const activateRoute = (routeId, updateAddress = true) => {
    const selectedTab = tabs.find((tab) => tab.dataset.routeTarget === routeId) || tabs[0];
    const selectedId = selectedTab.dataset.routeTarget;

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.classList.toggle("is-active", isSelected);
      tab.tabIndex = isSelected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== selectedId; });

    if (updateAddress) history.replaceState(null, "", `#${selectedId}`);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateRoute(tab.dataset.routeTarget));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      activateRoute(tabs[nextIndex].dataset.routeTarget);
    });
  });

  const requestedRoute = panels.some((panel) => `#${panel.id}` === window.location.hash)
    ? window.location.hash.slice(1)
    : tabs[0].dataset.routeTarget;
  activateRoute(requestedRoute, false);

  window.addEventListener("hashchange", () => {
    const routeId = window.location.hash.slice(1);
    if (panels.some((panel) => panel.id === routeId)) activateRoute(routeId, false);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateConvertedPrices(FALLBACK_RATE);
  document.querySelector("#eur-input")?.addEventListener("input", () => syncConverter("eur"));
  document.querySelector("#huf-input")?.addEventListener("input", () => syncConverter("huf"));
  loadExchangeRate();
  loadWeather();
  setupMaps();
  setupRouteTabs();
});
