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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", userApi);
app.use("/api/v2", taskApi);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello from Backend" });
});

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`✅ Server is started on port ${PORT}!!`);
});

// ------------------ Cron Job ------------------ //
// Run every 1 second (for testing only)
cron.schedule("* * * * * *", async () => {
  try {
    const now = new Date();

    // Find overdue tasks that are not complete AND email not sent
    const overdueTasks = await Task.find({
      dueDate: { $lt: now },
      complete: false,
      alertSent: false, // ✅ only pick tasks where alert not sent
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

        // ✅ Mark alert as sent
        task.alertSent = true;
        await task.save();
      }
    }
  } catch (error) {
    console.error("❌ Error in overdue job:", error);
  }
});
