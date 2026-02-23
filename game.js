let currentCity;
let timer = 20;
let interval;
let score = 0;

const cityName = document.getElementById("cityName");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const result = document.getElementById("result");

function startTimer() {
  timer = 20;
  timerDisplay.textContent = timer;

  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      clearInterval(interval);
      nextRound();
    }
  }, 1000);
}

function nextRound() {
  currentCity = cities[Math.floor(Math.random() * cities.length)];
  cityName.textContent = currentCity.name;
  result.innerHTML = "";
  startTimer();
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function pixelToLon(x, width) {
  return (x / width) * 360 - 180;
}

function pixelToLat(y, height) {
  return 90 - (y / height) * 180;
}

document.addEventListener("DOMContentLoaded", () => {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", () => {

    const svgDoc = worldObject.contentDocument;
    const svg = svgDoc.querySelector("svg");
    const paths = svgDoc.querySelectorAll("path");

    // 🎨 Colorear países
    paths.forEach(path => {
      const hue = Math.floor(Math.random() * 360);
      path.setAttribute("fill", `hsl(${hue}, 60%, 70%)`);
      path.setAttribute("stroke", "#ffffff");
      path.setAttribute("stroke-width", "0.5");
    });

    // 🖱 Click en mapa
    svg.addEventListener("click", (event) => {

      clearInterval(interval);

      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const guessedLon = pixelToLon(x, rect.width);
      const guessedLat = pixelToLat(y, rect.height);

      const distance = calculateDistance(
        guessedLat,
        guessedLon,
        currentCity.lat,
        currentCity.lon
      );

      const roundScore = Math.max(0, 5000 - distance);
      score += Math.round(roundScore);

      scoreDisplay.textContent = score;

      result.innerHTML = `Distancia: ${distance.toFixed(0)} km`;

      setTimeout(nextRound, 2000);
    });

    // 🚀 Iniciar juego
    nextRound();
  });
});
