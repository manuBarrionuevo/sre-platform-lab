const express = require("express");
const { taskCounter } = require("../metrics");

const router = express.Router();

const tasks = [
  { id: 1, title: "Instalar plataforma base", done: true },
  { id: 2, title: "Crear app propia", done: false }
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "El campo 'title' es obligatorio"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false
  };

  tasks.push(newTask);
  taskCounter.inc();

  return res.status(201).json(newTask);
});

module.exports = router;