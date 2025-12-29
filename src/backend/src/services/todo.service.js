const Todo = require("../models/todo.model");

const getAllTodos = async () => {
  return await Todo.findAll();
};

const getTodoById = async (id) => {
  return await Todo.findByPk(id);
};

const createTodo = async (data) => {
  return await Todo.create(data);
};

const updateTodo = async (id, data) => {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;
  return await todo.update(data);
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);
  if (!todo) return null;
  await todo.destroy();
  return true;
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
