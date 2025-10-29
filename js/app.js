// js/app.js
import { loadPage } from "./spa.js";
import { validateForm } from "./forms.js";

document.addEventListener("DOMContentLoaded", () => {
  // Navegação SPA
  document.querySelectorAll("a[data-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("href");
      loadPage(page);
    });
  });

  // Inicializa validação dos formulários
  validateForm();
});
