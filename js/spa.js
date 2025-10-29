// js/spa.js
export function loadPage(page) {
  const main = document.querySelector("main");

  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Página não encontrada.");
      return response.text();
    })
    .then(html => {
      main.innerHTML = html;
      window.scrollTo(0, 0);
    })
    .catch(err => {
      main.innerHTML = `<h2>Erro ao carregar página: ${err.message}</h2>`;
    });
}
