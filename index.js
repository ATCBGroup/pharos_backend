const express = require("express");
const app = express();

// The HelloWorld
app.get("/", (req, res) => {
  res.send("Hello from Node.js GitHub Versions!");
});

// The HelloWorld
app.get("/calendar", (req, res) => {
  const calendar = [
    { id: 1, name: "Calendar 1" },
    { id: 2, name: "Calendar 2" },
  ];
  res.json(calendar);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
