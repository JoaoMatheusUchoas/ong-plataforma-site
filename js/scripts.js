// scripts.js
document.addEventListener('DOMContentLoaded', function () {
  // inserir ano no rodapé
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year-2')?.textContent = y;
  document.getElementById('year-3')?.textContent = y;

  // Máscaras simples (CPF, telefone, CEP)
  function setInputFilter(elem, maskFn) {
    elem.addEventListener('input', function (e) {
      const start = elem.selectionStart;
      const beforeLength = elem.value.length;
      elem.value = maskFn(elem.value);
      // tentar restaurar cursor (simples)
      const afterLength = elem.value.length;
      elem.selectionStart = elem.selectionEnd = start + (afterLength - beforeLength);
    });
  }

  const cpfEl = document.getElementById('cpf');
  if (cpfEl) {
    setInputFilter(cpfEl, function (v) {
      v = v.replace(/\D/g, '').slice(0,11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return v;
    });
  }

  const telEl = document.getElementById('telefone');
  if (telEl) {
    setInputFilter(telEl, function (v) {
      v = v.replace(/\D/g, '').slice(0,11);
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      return v.replace(/-$/, '');
    });
  }

  const cepEl = document.getElementById('cep');
  if (cepEl) {
    setInputFilter(cepEl, function (v) {
      v = v.replace(/\D/g, '').slice(0,8);
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
      return v;
    });

    // exemplo: buscar via viacep (comentado — web requests desativadas neste contexto)
    // cepEl.addEventListener('blur', function() { ... });
  }

  // Form validation: usa validação nativa com melhoria de feedback
  const form = document.getElementById('form-cadastro');
  const feedback = document.getElementById('form-feedback');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        // mostrar mensagem geral e permitir que navegador destaque campos
        feedback.textContent = 'Por favor, corrija os campos destacados e tente novamente.';
        feedback.style.color = 'crimson';
        form.reportValidity();
        return;
      }
      // simular envio
      feedback.style.color = 'green';
      feedback.textContent = 'Cadastro enviado com sucesso! (simulação local)';
      // aqui você enviaria o form via fetch para uma API
      form.reset();
    });
  }
});
