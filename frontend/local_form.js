function toggleHorario(dia) {
  const div = document.getElementById(`horario-${dia}`);
  div.classList.toggle('d-none');
}

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const data = {
    sector: formData.get("sector"),
    horarios: {}
  };

  let algunoMarcado = false;
  let error = false;

  dias.forEach(dia => {
    const checkbox = document.getElementById(dia);
    if (checkbox && checkbox.checked) {
      algunoMarcado = true;  

      const entrada = formData.get(`entrada-${dia}`);
      const salida = formData.get(`salida-${dia}`);

      if (!entrada || !salida) {
        error = true;  
      } else {
        data.horarios[dia] = { entrada, salida };
      }
    }
  });

  const resultado = document.getElementById("resultado");

  if (!algunoMarcado) {
    resultado.textContent = "Selecciona al menos un día y completa los horarios.";
    resultado.className = "alert alert-warning mt-4";
    return;
  }

  if (error) {
    resultado.textContent = "Por favor, completa las horas de entrada y salida para los días seleccionados.";
    resultado.className = "alert alert-warning mt-4";
    return;
  }

  let tablaHorarios = `<table class="table table-striped mt-3">
    <thead>
      <tr>
        <th>Día</th>
        <th>Hora de entrada</th>
        <th>Hora de salida</th>
      </tr>
    </thead>
    <tbody>`;

  for (const dia in data.horarios) {
    tablaHorarios += `
      <tr>
        <td style="text-transform: capitalize;">${dia}</td>
        <td>${data.horarios[dia].entrada}</td>
        <td>${data.horarios[dia].salida}</td>
      </tr>`;
  }

  tablaHorarios += `</tbody></table>`;

  resultado.innerHTML = `
    <strong>Sector seleccionado:</strong> ${data.sector}
    <br><strong>Horarios guardados correctamente:</strong>
    ${tablaHorarios}
  `;

  resultado.className = "alert alert-success mt-4";

  this.reset();

  dias.forEach(d => {
    const horarioDiv = document.getElementById(`horario-${d}`);
    if (horarioDiv) {
      horarioDiv.classList.add("d-none");
    }
  });
});
