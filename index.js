const express = require("express");
const cron = require("node-cron");
const { initCalendar, getCalendar, postCalendar, deleteCalendar } = require("./functions/calendar");
const { scheduleFunction } = require("./functions/schedule");
const { getLog } = require("./functions/log");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node.js GitHub Versions!");
});

// Calendar Management API

app.get("/init", initCalendar);
app.get("/calendar", getCalendar);
app.post("/calendar", postCalendar);
app.delete("/calendar/:id", deleteCalendar);

// Schedule Function

app.get("/log", getLog);

cron.schedule("0 * * * *", () => {
  console.log("Running schedule function every hour");
  scheduleFunction();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port} - Redirection of port 3000 with nginx`);
});
