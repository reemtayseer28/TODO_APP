const express = require("express");
const cors = require("cors");
const app = express();

// ✅ This is required to parse JSON in request bodies
app.use(express.json());
// Enable CORS for local frontend
app.use(cors());

// Routes
const todoRoutes = require("./routes/todo.routes");
app.use("/api/todos", todoRoutes);

module.exports = app;
