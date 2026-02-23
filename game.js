const svg = document.getElementById("map");
const cityName = document.getElementById("cityName");
const result = document.getElementById("result");
const totalScoreDisplay = document.getElementById("totalScore");
const roundDisplay = document.getElementById("round");
const timerDisplay = document.getElementById("timer");

let totalScore = 0;
let round = 0;
let timer = 20;
let interval;
let gameCities = [];
let currentCity;

function getRandomCities(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

function startGame() {
  gameCities = getRandomCities(allCities, 10);
  nextRound();
}

function nextRound() {
  if (round >= 10) {
    cityName.textContent = "Juego terminado 🎉";
    return;
  }

  currentCity = gameCities[round];
  cityName.textContent = `Ubica: ${currentCity.name} (${currentCity.country})`;
  round++;
  roundDisplay.textContent = round;

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

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateScore(distance) {
  if (distance < 50) return 1000;
  if (distance < 200) return 800;
  if (distance < 500) return 500;
  if (distance < 1000) return 250;
  return 50;
}

function getTimeMultiplier(timeLeft) {
  if (timeLeft >= 14) return 2;
  if (timeLeft >= 7) return 1;
  return 0.5;
}

function pixelToLon(x, width) {
  return (x / width) * 360 - 180;
}

function pixelToLat(y, height) {
  const mercN = Math.PI - (2 * Math.PI * y) / height;
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(mercN) - Math.exp(-mercN)));
}

const worldObject = document.getElementById("worldObject");

worldObject.addEventListener("load", function() {

  const svgDoc = worldObject.contentDocument;
  const svgElement = svgDoc.querySelector("svg");

  // 🎨 Colorear países
  const countries = svgDoc.querySelectorAll("path");

  countries.forEach(country => {
    const hue = Math.floor(Math.random() * 360);
    country.style.fill = `hsl(${hue}, 60%, 70%)`;
    country.style.stroke = "#ffffff";
    country.style.strokeWidth = "0.5";
  });

  // 🖱 Detectar clic real en el mapa
  svgElement.addEventListener("click", function(event) {

    clearInterval(interval);

    const rect = svgElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const lon = pixelToLon(x, rect.width);
    const lat = pixelToLat(y, rect.height);

    const distance = calculateDistance(lat, lon, currentCity.lat, currentCity.lon);
    const base = calculateScore(distance);
    const multiplier = getTimeMultiplier(timer);
    const final = Math.round(base * multiplier);

    totalScore += final;
    totalScoreDisplay.textContent = totalScore;

    result.innerHTML = `
      Distancia: ${distance.toFixed(0)} km<br>
      Base: ${base} pts<br>
      Multiplicador: x${multiplier}<br>
      Ganaste: ${final} pts
    `;

    setTimeout(nextRound, 2000);
  });

});

  setTimeout(nextRound, 2000);
});

startGame();
const worldObject = document.getElementById("worldObject");

worldObject.addEventListener("load", function() {

  const svgDoc = worldObject.contentDocument;
  const countries = svgDoc.querySelectorAll("path");

  countries.forEach(country => {

    // Color aleatorio tipo atlas
    const hue = Math.floor(Math.random() * 360);
    country.style.fill = `hsl(${hue}, 60%, 70%)`;
    country.style.stroke = "#ffffff";
    country.style.strokeWidth = "0.5";

  });

});
worldObject.addEventListener("load", function() {
  nextRound();
});
