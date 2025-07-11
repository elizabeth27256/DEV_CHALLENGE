document.addEventListener("DOMContentLoaded", async () => {
  const usuario_id = localStorage.getItem("usuario_id");
  const contenedor = document.getElementById("cartas");
  const mensaje = document.getElementById("mensaje");

  if (!usuario_id) {
    mensaje.textContent = "No se ha iniciado sesión.";
    return;
  }

  try {
    const API = 'https://dev-challenge-jxg9.onrender.com/api';
    const res = await fetch(`${API}/coincidences/${usuario_id}`);
    const data = await res.json();

    if (data.coincidencias.length === 0) {
      mensaje.textContent = "No existen coincidencias, por favor inténtelo más tarde.";
      return;
    }

    data.coincidencias.forEach(user => {
      const card = document.createElement("div");
      card.className = "carta";

      card.innerHTML = `
        <p><strong title="${user.nombres}">${user.usuario}</strong></p>
        <p>Cédula: ${user.cedula}</p>
        <p>Teléfono: ${user.telefono}</p>
        <p>Sector: ${user.sector}</p>
      `;

      contenedor.appendChild(card);
    });

  } catch (err) {
    mensaje.textContent = "Error al obtener coincidencias.";
    console.error(err);
  }
});

document.getElementById("nuevoHorarioBtn").addEventListener("click", () => {
  localStorage.setItem("forzarHorario", "1");
  window.location.href = "local_form.html";
});

document.getElementById("nuevoHorarioBtn").addEventListener("click", () => {
  window.location.href = "local_form.html";
});

document.getElementById("btnCerrar").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});