const app = require("./app");
const sequelize = require("./database");

const PORT = 5000;


const startServer = async () => {
  try {
    await sequelize.sync(); // sync all models
    console.log("Database synced!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
