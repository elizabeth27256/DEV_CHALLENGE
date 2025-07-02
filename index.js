import web from "./web.js";

const PORT = process.env.PORT || 1000;
web.listen(PORT, () => {
  console.log(`Servicio iniciado en el puerto ${PORT}`);
});