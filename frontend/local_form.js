function toggleHorario(dia) {
  const div = document.getElementById(`horario-${dia}`);
  div.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario_id = localStorage.getItem("usuario_id");
  if (!usuario_id) {
    window.location.href = "login.html";
    return;
  }

  const forzar = localStorage.getItem("forzarHorario") === "1";
  if (forzar) {
    localStorage.removeItem("forzarHorario");
  } else {
    try {
      const API = 'https://dev-challenge-jxg9.onrender.com/api';
      const resp = await fetch(`${API}/horarios/${usuario_id}`);
      const info = await resp.json();
      if (info.existe) {
        window.location.href = "catalog.html";
        return;
      }
    } catch (e) {
      console.error("No se pudo verificar horarios:", e);
    }
  }

  const formulario = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
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

    if (!algunoMarcado) {
      resultado.textContent = "Selecciona al menos un día y completa los horarios.";
      resultado.className = "alert alert-warning mt-4";
      resultado.classList.remove("d-none");
      return;
    }

    if (error) {
      resultado.textContent = "Por favor, completa las horas de entrada y salida para los días seleccionados.";
      resultado.className = "alert alert-warning mt-4";
      resultado.classList.remove("d-none");
      return;
    }

    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      resultado.textContent = "No se ha iniciado sesión. Por favor, inicia sesión primero.";
      resultado.className = "alert alert-danger mt-4";
      resultado.classList.remove("d-none");
      return;
    }

    const payload = {
      horarios: data.horarios,
      sector: data.sector,
      usuario_id: usuario_id
    };

    try {
      const API = 'https://dev-challenge-jxg9.onrender.com/api';
      const res = await fetch(`${API}/horarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
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
          <strong>${result.mensaje}</strong>
          <br><strong>Sector seleccionado:</strong> ${data.sector}
          ${tablaHorarios}
          <div class="text-end mt-3">
            <a href="catalog.html" class="btn btn-primary">Siguiente</a>
          </div>
        `;
        resultado.className = "alert alert-success mt-4";
        resultado.classList.remove("d-none");

        this.reset();
        dias.forEach(d => {
          const horarioDiv = document.getElementById(`horario-${d}`);
          if (horarioDiv) horarioDiv.classList.remove("show");
        });
      } else {
        resultado.textContent = result.mensaje || "Error al guardar horarios.";
        resultado.className = "alert alert-warning mt-4";
        resultado.classList.remove("d-none");
      }
    } catch (err) {
      resultado.textContent = "No se pudo conectar al servidor.";
      resultado.className = "alert alert-danger mt-4";
      resultado.classList.remove("d-none");
    }
  });
});
