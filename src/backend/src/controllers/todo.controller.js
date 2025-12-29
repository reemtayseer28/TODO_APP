
const todoService = require("../services/todo.service");

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;

    if (!title || !description || !deadline || !priority) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate deadline: must be today or in the future
    const dl = new Date(deadline);
    if (Number.isNaN(dl.getTime())) {
      return res.status(400).json({ error: "Invalid deadline format" });
    }
    const today = new Date();
    // Compare dates ignoring time portion
    const dlDate = new Date(dl.getFullYear(), dl.getMonth(), dl.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dlDate < todayDate) {
      return res.status(400).json({ error: "Deadline must be today or a future date" });
    }

    const todo = await todoService.createTodo({
      title,
      description,
      deadline,
      priority,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // If deadline is provided, validate it
    if (data.deadline) {
      const dl = new Date(data.deadline);
      if (Number.isNaN(dl.getTime())) {
        return res.status(400).json({ error: "Invalid deadline format" });
      }
      const today = new Date();
      const dlDate = new Date(dl.getFullYear(), dl.getMonth(), dl.getDate());
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (dlDate < todayDate) {
        return res.status(400).json({ error: "Deadline must be today or a future date" });
      }
    }
    const updated = await todoService.updateTodo(id, data);
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await todoService.deleteTodo(id);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
