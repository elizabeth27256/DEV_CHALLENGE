document.addEventListener("DOMContentLoaded", async () => {
  const usuario_id = localStorage.getItem("usuario_id");
  const contenedor = document.getElementById("cartas");
  const mensaje = document.getElementById("mensaje");

  if (!usuario_id) {
    mensaje.textContent = "No se ha iniciado sesión.";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/coincidences/${usuario_id}`);
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
