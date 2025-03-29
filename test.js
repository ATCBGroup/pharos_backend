const { default: axios } = require("axios");

const getHue = async () => {
  const url = "http://192.168.0.36/api/Y7kr555AYuqNTtSQhXBLEycwRJ7EoVx0n1tsfu7k/lights";
  const hue = await axios.get(url);
  console.log(hue.data);
};
// axios.delete("http://192.168.0.224/calendar/5");

const blink = async () => {
  let color = 65535;
  const currentHour = new Date().getHours();

  if (currentHour >= 18) {
    color = 25500;
  }
  console.log(currentHour);
  console.log(color);
  const lamps = [1, 2, 3, 4, 18];

  lamps.forEach(async (lamp) => {
    const url = `http://192.168.0.36/api/Y7kr555AYuqNTtSQhXBLEycwRJ7EoVx0n1tsfu7k/lights/${lamp}/state`;
    axios.put(url, {
      on: true,
      sat: 254,
      bri: 254,
      hue: color,
    });
  });
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

  lamps.forEach(async (lamp) => {
    const url = `http://192.168.0.36/api/Y7kr555AYuqNTtSQhXBLEycwRJ7EoVx0n1tsfu7k/lights/${lamp}/state`;
    axios.put(url, {
      on: false,
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  color = lamps.forEach(async (lamp) => {
    const url = `http://192.168.0.36/api/Y7kr555AYuqNTtSQhXBLEycwRJ7EoVx0n1tsfu7k/lights/${lamp}/state`;
    axios.put(url, {
      on: true,
      sat: 254,
      bri: 254,
      hue: color,
    });
  });
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

  lamps.forEach(async (lamp) => {
    const url = `http://192.168.0.36/api/Y7kr555AYuqNTtSQhXBLEycwRJ7EoVx0n1tsfu7k/lights/${lamp}/state`;
    axios.put(url, {
      on: false,
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
};

blink();
