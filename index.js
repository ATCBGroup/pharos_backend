const express = require("express");

const db = require("better-sqlite3")("pharos.db");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node.js GitHub Versions!");
});

app.get("/init", (req, res) => {
  // Initialize the database and create the table if it doesn't exist

  const query = `
  CREATE TABLE calendar (
    id INTEGER PRIMARY KEY, 
    nameEvent STRING NOT NULL,
    description STRING NOT NULL,
    startDate STRING NOT NULL,
    endDate STRING NOT NULL,
    timeline INTEGER

)`;

  db.exec(query);

  const data = [
    { nameEvent: "Event 1", description: "Description 1", startDate: "2023-10-01", endDate: "2023-10-02", timeline: 1 },
    { nameEvent: "Event 2", description: "Description 2", startDate: "2023-10-03", endDate: "2023-10-04", timeline: 2 },
    { nameEvent: "Event 3", description: "Description 3", startDate: "2023-10-05", endDate: "2023-10-06", timeline: 3 },
    { nameEvent: "Event 4", description: "Description 4", startDate: "2023-10-07", endDate: "2023-10-08", timeline: 4 },
  ];

  const inserData = db.prepare(`INSERT INTO calendar (nameEvent, description, startDate, endDate, timeline) VALUES (?, ?, ?, ?, ?)`);
  data.forEach((element) => {
    inserData.run(element.nameEvent, element.description, element.startDate, element.endDate, element.timeline);
  });

  res.send("Database initialized and data inserted!");
});

app.get("/calendar", (req, res) => {
  try {
    const query = `
        SELECT * FROM calendar
      `;

    const stmt = db.prepare(query);
    const calendar = stmt.all();

    res.json(calendar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Please init database first" });
  }
});

app.post("/calendar", (req, res) => {
  const { nameEvent, description, startDate, endDate, timeline } = req.body.params;

  // Insert new user into the database
  const insertQuery = `INSERT INTO calendar (nameEvent, description, startDate, endDate, timeline) VALUES (?, ?, ?, ?, ?)`;
  const stmt = db.prepare(insertQuery);
  stmt.run(nameEvent, description, startDate, endDate, timeline);

  res.status(201).json({ message: "Event added successfully!" });
});

app.delete("/calendar/:id", (req, res) => {
  const { id } = req.params;

  // Delete user from the database
  const deleteQuery = `DELETE FROM calendar WHERE id = ?`;
  const stmt = db.prepare(deleteQuery);
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json({ message: "Event deleted successfully!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
