const express = require("express");
const tasksRouter = require("./routes/tasks");
const { register, httpRequestCounter } = require("./metrics");
const { log } = require("./logger");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const route = req.route?.path || req.baseUrl || req.path || "unknown";

    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: String(res.statusCode)
    });

    log("info", "HTTP request", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start
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

module.exports = app;