const { default: axios } = require("axios");

// Example of a POST request using fetch
const url = "http://192.168.0.224//calendar"; // Replace with your API endpoint
const data = {
  nameEvent: "Fete Nationale",
  description: "Description 3",
  startDate: "2023-10-05",
  endDate: "2023-10-06",
  timeline: 3,
};

axios.post(url, {
  params: data,
});
