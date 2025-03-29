const express = require("express");
const app = express();
var sqlite3 = require("sqlite3").verbose();

// The HelloWorld
app.get("/", (req, res) => {
  res.send("Hello from Node.js GitHub Versions!");
});

// The HelloWorld
app.get("/calendar", (req, res) => {
  const db = new sqlite3.Database("calendar.db");

  db.all("SELECT * FROM test", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get("/write", (req, res) => {
  const db = new sqlite3.Database("calendar.db");

  db.run("INSERT INTO test (id, name) VALUES (?, ?)", ["2", "deux"], function (err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ id: this.lastID });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
