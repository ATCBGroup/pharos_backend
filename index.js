const express = require("express");
const app = express();
var sqlite3 = require("sqlite3").verbose();

// The HelloWorld
app.get("/", (req, res) => {
  res.send("Hello from Node.js GitHub Versions!");
});

// The HelloWorld
app.get("/calendar", (req, res) => {
  const db = new sqlite3.Database("./calendar.db");

  db.all("SELECT * FROM calendar", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });

  res.json(calendar);
});

app.get("/create", (req, res) => {
  const db = new sqlite3.Database("./calendar.db");
  db.serialize(() => {
    db.run("CREATE TABLE calendar (id INT, name TEXT)");
    const stmt = db.prepare("INSERT INTO calendar VALUES (?, ?)");
    stmt.run(1, "Calendar 1");
    stmt.finalize();
  });
  db.close();
  res.send("Calendar created!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
