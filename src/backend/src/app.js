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

const path = require("path");

// serve frontend files
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

