const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodo);
router.post("/", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
