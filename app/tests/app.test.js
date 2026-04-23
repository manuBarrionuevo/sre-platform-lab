const request = require("supertest");
const app = require("../src/app");

describe("Platform App", () => {
  test("GET /health responde 200", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET /api/tasks responde 200", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/tasks crea tarea", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Desplegar con Argo CD" });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Desplegar con Argo CD");
  });

  test("GET ruta inexistente responde 404", async () => {
    const response = await request(app).get("/no-existe");
    expect(response.statusCode).toBe(404);
  });

  test("POST /api/tasks sin title responde 400", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({});

    expect(response.statusCode).toBe(400);
  });
});