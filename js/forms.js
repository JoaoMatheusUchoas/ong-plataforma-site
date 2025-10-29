// js/forms.js
export function validateForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll("input[required], textarea[required]").forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("error");
        showAlert(`O campo "${input.name}" é obrigatório.`);
        valid = false;
      } else {
        input.classList.remove("error");
      }
    });

    if (valid) {
      showAlert("Formulário enviado com sucesso!", "success");
      form.reset();
    }
  });
}

function showAlert(message, type = "error") {
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;

  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}
