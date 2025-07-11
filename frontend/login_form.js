    document.getElementById("loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;
      const mensajeError = document.getElementById("mensajeError");
      mensajeError.textContent = "";

      try {
        const API = 'https://dev-challenge-jxg9.onrender.com/api';
        const res = await fetch(`${API}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, contrasena })
        });

        const result = await res.json();

        if (res.ok) {
          localStorage.setItem("usuario_id", result.usuario.id);
          window.location.href = "local_form.html"
        } else {
          mensajeError.textContent = result.mensaje;
        }
      } catch (err) {
        mensajeError.textContent = "Error de conexión con el servidor.";
      }
    });