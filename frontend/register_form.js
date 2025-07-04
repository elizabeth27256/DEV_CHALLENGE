document.getElementById("formRegistro").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nombres = document.getElementById("nombres").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const repetirContrasena = document.getElementById("repetirContrasena").value;
    const mensajeError = document.getElementById("mensajeError");

    mensajeError.textContent = "";

    const datos = { nombres, cedula, correo, telefono, usuario, contrasena, repetirContrasena };

    try {
      const res = await fetch("http://localhost:3000/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const result = await res.json();

      if (res.ok) {
        alert("¡Registro exitoso!");
        window.location.href = "/";
      } else {
        mensajeError.textContent = result.mensaje || "Error en el registro.";
      }
    } catch (err) {
      mensajeError.textContent = "No se pudo conectar al servidor.";
    }
  });