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
const allowedOrigins = [
  "https://task-management-app-frontend-l4pp.onrender.com",
];
// ---------------- CORS ---------------- //
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Handle OPTIONS preflight for all routes
app.options("*", cors());

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
