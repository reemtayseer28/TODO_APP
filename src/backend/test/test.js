const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/database");

let todoId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Todo API Automated Tests", () => {

  // ===== CREATE =====
  test("POST /api/todos - create todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({
        title: "Test Todo",
        description: "Testing create",
        priority: "high"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Todo");

    todoId = res.body.id; // نخزن id
  });

  // ===== READ =====
  test("GET /api/todos - get all todos", async () => {
    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  // ===== UPDATE =====
  test("PUT /api/todos/:id - update todo", async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        title: "Updated Todo",
        completed: true
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Todo");
    expect(res.body.completed).toBe(true);
  });

  // ===== DELETE =====
  test("DELETE /api/todos/:id - delete todo", async () => {
    const res = await request(app)
      .delete(`/api/todos/${todoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Todo deleted");
  });

});
