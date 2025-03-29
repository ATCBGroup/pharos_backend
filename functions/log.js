const db = require("better-sqlite3")("pharos.db");

exports.getLog = (req, res) => {
  try {
    const query = `
            SELECT * FROM log
            `;

    const stmt = db.prepare(query);
    const log = stmt.all();

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Please init database first" });
  }
};
