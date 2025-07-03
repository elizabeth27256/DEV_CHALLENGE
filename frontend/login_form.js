    document.getElementById("loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;
      const mensajeError = document.getElementById("mensajeError");
      mensajeError.textContent = "";

      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, contrasena })
        });

        const result = await res.json();

        if (res.ok) {
          alert("Inicio de sesión exitoso");
          // Redirigir a la página principal (dashboard)
          // window.location.href = "dashboard.html"; // por ejemplo
        } else {
          mensajeError.textContent = result.mensaje;
        }
      } catch (err) {
        mensajeError.textContent = "Error de conexión con el servidor.";
      }
    });