const app = require("./app");
const { log } = require("./logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log("info", "Servidor iniciado", { port: PORT });
});