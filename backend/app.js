// server.js
const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn"); // MongoDB connection
const cors = require("cors");
const userApi = require("./router/user");
const taskApi = require("./router/task");
const cron = require("node-cron");
const Task = require("./models/task");
const User = require("./models/user");
const sendMail = require("./utils/mailer");

// ---------------- CORS ---------------- //
const corsOptions = {
  origin: [
    "https://task-management-app-frontend-l4pp.onrender.com" // deployed frontend
    
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ---------------- Routes ---------------- //
app.use("/api/v1", userApi);
app.use("/api/v2", taskApi);
app.get("/", (req, res) => res.status(200).json({ message: "Hello from Backend" }));

// ---------------- Start Server ---------------- //
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// ---------------- Cron Job for overdue tasks ---------------- //
cron.schedule("* * * * * *", async () => {
  try {
    const now = new Date();
    const overdueTasks = await Task.find({
      dueDate: { $lt: now },
      complete: false,
      alertSent: false,
    }).populate("user");

    for (let task of overdueTasks) {
      const user = task.user;
      if (user && user.email) {
        await sendMail(
          user.email,
          "⚠️ Task Overdue Alert",
          `Your task "${task.title}" was due on ${task.dueDate.toDateString()} and is still incomplete!`
        );
        console.log(`📧 Email sent to ${user.email}`);

        task.alertSent = true;
        await task.save();
      }
    }
  } catch (error) {
    console.error("❌ Cron job error:", error);
  }
});
