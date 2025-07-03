function toggleHorario(dia) {
  const div = document.getElementById(`horario-${dia}`);
  div.classList.toggle('d-none');
}

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const data = {
    horarios: {}
  };

  let algunoMarcado = false;

  dias.forEach(dia => {
    const checkbox = document.getElementById(dia);
    if (checkbox && checkbox.checked) {
      algunoMarcado = true;
      data.horarios[dia] = {
        entrada: formData.get(`entrada-${dia}`),
        salida: formData.get(`salida-${dia}`)
      };
    }
  });

  const resultado = document.getElementById("resultado");

  if (!algunoMarcado) {
    resultado.textContent = "Selecciona al menos un día y completa los horarios.";
    resultado.classList.remove("d-none", "alert-success");
    resultado.classList.add("alert-warning");
    return;
  }

  resultado.innerHTML = `
    <strong>Horarios guardados correctamente:</strong>
    <pre>${JSON.stringify(data.horarios, null, 2)}</pre>
  `;
  resultado.classList.remove("d-none", "alert-warning");
  resultado.classList.add("alert-success");

  this.reset();
  dias.forEach(d => {
    const horarioDiv = document.getElementById(`horario-${d}`);
    if (horarioDiv) {
      horarioDiv.classList.add("d-none");
    }
  });
});
