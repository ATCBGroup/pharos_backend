const express = require("express");
const { initCalendar, getCalendar, postCalendar, deleteCalendar } = require("./functions/calendar");
const db = require("better-sqlite3")("pharos.db");
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

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port} - Redirection of port 3000 with nginx`);
});
