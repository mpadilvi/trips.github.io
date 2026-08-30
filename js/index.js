const catalog = window.destinationCatalog || [];

const normalizeText = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es-ES");

function cardTemplate(destination) {
  return `
    <article class="destination-card" data-slug="${destination.slug}">
      <div class="destination-card-copy">
        <p class="status">Guía completa</p>
        <h3><a href="destinations/${destination.slug}.html">${destination.name}</a></h3>
        <p>${destination.summary}</p>
        <dl class="destination-card-stats">
          <div><dt>Total realista</dt><dd>${destination.budget}</dd></div>
          <div><dt>Máxima habitual</dt><dd>${destination.temperature}</dd></div>
          <div><dt>A pie</dt><dd>${destination.walk}</dd></div>
          <div><dt>Excursión</dt><dd>${destination.excursion}</dd></div>
        </dl>
      </div>
      <div class="destination-card-footer">
        <a class="destination-card-link" href="destinations/${destination.slug}.html">Abrir guía <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
}

function renderCards(destinations) {
  const grid = document.querySelector("#destination-grid");
  const empty = document.querySelector("#filter-empty");
  const count = document.querySelector("#results-count");
  grid.innerHTML = destinations.map(cardTemplate).join("");
  empty.hidden = destinations.length > 0;
  count.textContent = `${destinations.length} ${destinations.length === 1 ? "destino" : "destinos"}`;
}

function activeFilters() {
  return {
    search: normalizeText(document.querySelector("#destination-search").value.trim()),
    currency: document.querySelector("#filter-currency").value,
    budget: document.querySelector("#filter-budget").value,
    climate: document.querySelector("#filter-climate").value,
    trip: document.querySelector("#filter-trip").value,
  };
}

function applyFilters() {
  const filters = activeFilters();
  const filtered = catalog.filter((destination) => {
    const searchable = normalizeText(`${destination.name} ${destination.summary} ${destination.excursion}`);
    return (!filters.search || searchable.includes(filters.search))
      && (!filters.currency || destination.currency === filters.currency)
      && (!filters.budget || destination.budgetBand === filters.budget)
      && (!filters.climate || destination.climate === filters.climate)
      && (!filters.trip || destination.tripType === filters.trip);
  });
  renderCards(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(catalog);
  document.querySelectorAll("#destination-search, .destination-filter").forEach((control) => {
    control.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyFilters);
  });
  document.querySelector("#reset-filters").addEventListener("click", () => {
    document.querySelector("#destination-search").value = "";
    document.querySelectorAll(".destination-filter").forEach((filter) => { filter.value = ""; });
    applyFilters();
    document.querySelector("#destination-search").focus();
  });
});
