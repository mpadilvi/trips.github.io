(function () {
  "use strict";

  const storageKey = "trips-color-theme";
  const darkStyles = document.querySelector("#dark-theme-styles");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (!darkStyles) return;

  function readPreference() {
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "system";
    } catch (_error) {
      return "system";
    }
  }

  function savePreference(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (_error) {
      // El selector sigue funcionando durante esta visita si el almacenamiento está bloqueado.
    }
  }

  function isDark(theme) {
    return theme === "dark" || (theme === "system" && systemTheme.matches);
  }

  function applyTheme(theme) {
    darkStyles.media = theme === "dark"
      ? "all"
      : theme === "light"
        ? "not all"
        : "(prefers-color-scheme: dark)";
    document.documentElement.dataset.theme = theme;
  }

  let preference = readPreference();
  applyTheme(preference);

  function updateButton(button) {
    const darkIsActive = isDark(preference);
    const nextTheme = darkIsActive ? "claro" : "oscuro";
    button.setAttribute("aria-label", `Cambiar al modo ${nextTheme}`);
    button.setAttribute("title", `Cambiar al modo ${nextTheme}`);
    button.innerHTML = `<span class="theme-toggle-icon" aria-hidden="true">${darkIsActive ? "☀" : "◐"}</span><span class="theme-toggle-label">Modo ${nextTheme}</span>`;
  }

  function installButton() {
    const header = document.querySelector(".destination-header-inner, body > .site-header");
    if (!header || header.querySelector(".theme-toggle")) return;

    const button = document.createElement("button");
    button.className = "theme-toggle";
    button.type = "button";
    updateButton(button);
    button.addEventListener("click", function () {
      preference = isDark(preference) ? "light" : "dark";
      savePreference(preference);
      applyTheme(preference);
      updateButton(button);
    });
    header.append(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installButton, { once: true });
  } else {
    installButton();
  }

  systemTheme.addEventListener?.("change", function () {
    if (preference !== "system") return;
    const button = document.querySelector(".theme-toggle");
    if (button) updateButton(button);
  });
}());
