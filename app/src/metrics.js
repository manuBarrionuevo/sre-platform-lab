const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "platform_app_http_requests_total",
  help: "Cantidad total de requests HTTP",
  labelNames: ["method", "route", "status_code"],
  registers: [register]
});

const httpErrorCounter = new client.Counter({
  name: "platform_app_http_errors_total",
  help: "Cantidad total de requests HTTP con error",
  labelNames: ["method", "route", "status_code"],
  registers: [register]
});

const httpRequestDuration = new client.Histogram({
  name: "platform_app_http_request_duration_seconds",
  help: "Duracion de requests HTTP en segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
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
  httpErrorCounter,
  httpRequestDuration,
  taskCounter
};