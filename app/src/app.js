const express = require("express");
const tasksRouter = require("./routes/tasks");
const {
  register,
  httpRequestCounter,
  httpErrorCounter,
  httpRequestDuration
} = require("./metrics");
const { log } = require("./logger");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const route = req.route?.path || req.baseUrl || req.path || "unknown";
    const statusCode = String(res.statusCode);
    const durationSeconds =
      Number(process.hrtime.bigint() - start) / 1_000_000_000;

    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: statusCode
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
        status_code: statusCode
      },
      durationSeconds
    );

    if (res.statusCode >= 400) {
      httpErrorCounter.inc({
        method: req.method,
        route,
        status_code: statusCode
      });
    }

    log("info", "HTTP request", {
      method: req.method,
      path: req.originalUrl,
      route,
      statusCode: res.statusCode,
      durationMs: Number((durationSeconds * 1000).toFixed(2))
    });
  });

  next();
});

app.get("/", (req, res) => {
  res.json({
    app: "platform-app",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/api/tasks", tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

module.exports = app;