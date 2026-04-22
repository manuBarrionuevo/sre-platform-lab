const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "platform_app_http_requests_total",
  help: "Cantidad total de requests HTTP",
  labelNames: ["method", "route", "status_code"],
  registers: [register]
});

const taskCounter = new client.Counter({
  name: "platform_app_tasks_created_total",
  help: "Cantidad total de tareas creadas",
  registers: [register]
});

module.exports = {
  register,
  httpRequestCounter,
  taskCounter
};