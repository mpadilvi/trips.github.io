const catalog = window.destinationCatalog || [];
const STORAGE_KEY = "trips-2026-trip-mode-v1";

const form = document.querySelector("#trip-form");
const destinationSelect = document.querySelector("#confirmed-destination");
const routeSelect = document.querySelector("#confirmed-route");
const guideLink = document.querySelector("#selected-guide-link");
const incidentsLink = document.querySelector("#selected-incidents-link");
const routeLink = document.querySelector("#selected-route-link");
const saveStatus = document.querySelector("#save-status");

function populateDestinations() {
  destinationSelect.insertAdjacentHTML("beforeend", catalog.map((destination) =>
    `<option value="${destination.slug}">${destination.name}</option>`).join(""));
}

function selectedDestination() {
  return catalog.find((destination) => destination.slug === destinationSelect.value);
}

function updateDestinationLinks(preserveRoute = true) {
  const destination = selectedDestination();
  const previousRoute = preserveRoute ? routeSelect.value : "";
  routeSelect.innerHTML = '<option value="">Selecciona una ruta</option>';

  if (!destination) {
    routeSelect.disabled = true;
    guideLink.hidden = true;
    incidentsLink.hidden = true;
    routeLink.hidden = true;
    return;
  }

  routeSelect.disabled = false;
  routeSelect.insertAdjacentHTML("beforeend", destination.routes.map((route) =>
    `<option value="${route.hash}">${route.name}</option>`).join(""));
  if (destination.routes.some((route) => route.hash === previousRoute)) routeSelect.value = previousRoute;

  guideLink.href = `destinations/${destination.slug}.html`;
  guideLink.textContent = `Abrir la guía de ${destination.name}`;
  guideLink.hidden = false;
  incidentsLink.href = `destinations/${destination.slug}.html#incidencias`;
  incidentsLink.hidden = false;
  updateRouteLink();
  document.querySelector("#check-destination").checked = true;
}

function updateRouteLink() {
  const destination = selectedDestination();
  if (!destination || !routeSelect.value) {
    routeLink.hidden = true;
    return;
  }
  const route = destination.routes.find((item) => item.hash === routeSelect.value);
  routeLink.href = `destinations/${destination.slug}.html#${route.hash}`;
  routeLink.textContent = `Abrir ruta: ${route.name}`;
  routeLink.hidden = false;
  document.querySelector("#check-route").checked = true;
}

function collectState() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.checklist = [...document.querySelectorAll(".travel-checklist input")].map((checkbox) => ({
    id: checkbox.id,
    checked: checkbox.checked,
  }));
  return data;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState()));
  saveStatus.textContent = `Guardado en este navegador a las ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}.`;
}

function restoreState() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (error) { saved = null; }
  if (!saved) return;
  Object.entries(saved).forEach(([name, value]) => {
    if (name === "checklist") return;
    const field = form.elements.namedItem(name);
    if (field && typeof value === "string") field.value = value;
  });
  updateDestinationLinks(true);
  if (saved.route) routeSelect.value = saved.route;
  updateRouteLink();
  saved.checklist?.forEach((item) => {
    const checkbox = document.getElementById(item.id);
    if (checkbox) checkbox.checked = Boolean(item.checked);
  });
  saveStatus.textContent = "Datos recuperados de este navegador.";
}

function updateCountdown() {
  const today = new Date();
  const reveal = new Date("2026-09-09T00:00:00+02:00");
  const departure = new Date("2026-09-11T00:00:00+02:00");
  const returnDate = new Date("2026-09-15T00:00:00+02:00");
  const day = 86_400_000;
  const label = document.querySelector("#trip-countdown");
  if (today < reveal) {
    const days = Math.ceil((reveal - today) / day);
    label.textContent = `${days} ${days === 1 ? "día" : "días"} para conocer el destino`;
  } else if (today < departure) label.textContent = "Destino revelado · toca cerrar reservas";
  else if (today < returnDate) label.textContent = "Viaje en curso";
  else label.textContent = "Viaje finalizado";
}

function clearState() {
  if (!window.confirm("¿Quieres borrar todos los datos guardados del modo viaje en este navegador?")) return;
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  document.querySelectorAll(".travel-checklist input").forEach((checkbox) => { checkbox.checked = false; });
  updateDestinationLinks(false);
  saveStatus.textContent = "Datos borrados.";
  destinationSelect.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  populateDestinations();
  restoreState();
  updateCountdown();
  destinationSelect.addEventListener("change", () => { updateDestinationLinks(false); saveState(); });
  routeSelect.addEventListener("change", () => { updateRouteLink(); saveState(); });
  form.addEventListener("input", (event) => {
    if (event.target !== destinationSelect && event.target !== routeSelect) saveState();
  });
  document.querySelectorAll(".travel-checklist input").forEach((checkbox) => checkbox.addEventListener("change", saveState));
  document.querySelector("#clear-trip-data").addEventListener("click", clearState);
});
