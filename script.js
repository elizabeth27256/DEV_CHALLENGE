function toggleHorario(dia) {
  const div = document.getElementById(`horario-${dia}`);
  div.classList.toggle('d-none');
}

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};

  if (document.getElementById("lunes").checked) {
    data["lunes"] = {
      entrada: formData.get("entrada-lunes"),
      salida: formData.get("salida-lunes")
    };
  }

  console.log("Datos enviados:", data);

  const resultado = document.getElementById("resultado");
  resultado.textContent = "Horario del lunes guardado correctamente.";
  resultado.classList.remove("d-none");

  this.reset();
  document.getElementById("horario-lunes").classList.add("d-none");
});
