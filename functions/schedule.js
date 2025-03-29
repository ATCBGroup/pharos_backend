const db = require("better-sqlite3")("pharos.db");

function convertToUnixMs(dateString) {
  const date = new Date(dateString);
  return date.getTime();
}

const log = (event) => {
  const logQuery = `
        INSERT INTO log (date, event) VALUES (?, ?)
    `;
  const stmt = db.prepare(logQuery);
  stmt.run(new Date().toISOString(), event);
};

exports.scheduleFunction = () => {
  log("Schedule function started");
  const query = `
    SELECT * FROM calendar
  `;

  const stmt = db.prepare(query);
  const calendar = stmt.all();
  const currentDate = new Date().getTime(); // Get the current date in milliseconds

  // Example usage:
  calendar.forEach((event) => {
    // We need to handle the midnight problem by adding 12 hours to the end date

    const startDate = convertToUnixMs(event.startDate) + 12 * 60 * 60 * 1000; // Convert start date to milliseconds
    const endDate = convertToUnixMs(event.endDate) + 12 * 60 * 60 * 1000; // Convert end date to milliseconds

    if (currentDate >= startDate && currentDate <= endDate) {
      log(`   ${event.nameEvent} is currently active.`);
    } else {
      //   log(`   ${event.nameEvent} is not active.`);
    }
  });
  //   console.log(calendar);
};
