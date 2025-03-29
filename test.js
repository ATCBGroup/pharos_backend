const { default: axios } = require("axios");

// Example of a POST request using fetch
const url = "http://192.168.0.224/calendar"; // Replace with your API endpoint
const data = {
  nameEvent: "Les Parrains",
  description: "Description 3",
  startDate: "2025-02-28",
  endDate: "2025-03-30",
  timeline: 3,
};

axios.post(url, {
  params: data,
});

// axios.delete("http://192.168.0.224/calendar/5");
