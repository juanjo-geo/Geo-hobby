document.addEventListener("DOMContentLoaded", function () {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", function () {

    const svgDoc = worldObject.contentDocument;
    const countries = svgDoc.querySelectorAll("path, polygon");

    if (!countries || countries.length === 0) {
      console.log("No se encontraron países en el SVG");
      return;
    }

    iniciarJuego(svgDoc, countries);

  });

});


// 🔁 Mapeo país texto (cities.js) → id real del SVG
// TODO en minúsculas para evitar errores
const countryMap = {
  "España": "es",
  "Colombia": "co",
  "USA": "us",
  "Japón": "jp",
  "Italia": "it",
  "Alemania": "de",
  "Perú": "pe",
  "Chile": "cl",
  "Canadá": "ca"
};


function iniciarJuego(svgDoc, countries) {

  // 🎨 Reset visual
  countries.forEach(el => {
    el.style.fill = "#dcdcdc";
    el.style.cursor = "pointer";
  });

  const ciudadesSeleccionadas = mezclarArray([...cities]).slice(0, 5);

  let indiceActual = 0;
  let puntos = 0;

  actualizarUI();

  function actualizarUI() {

    if (indiceActual >= ciudadesSeleccionadas.length) {
      document.getElementById("cityName").textContent =
        "Juego terminado - Puntos: " + puntos;
      return;
    }

    const ciudad = ciudadesSeleccionadas[indiceActual];
    document.getElementById("cityName").textContent = ciudad.name;
  }


  countries.forEach(country => {

    country.addEventListener("click", function () {

      if (indiceActual >= ciudadesSeleccionadas.length) return;

      const ciudad = ciudadesSeleccionadas[indiceActual];
      const countryIdCorrecto = countryMap[ciudad.country];

      if (!countryIdCorrecto) {
        console.log("País no mapeado:", ciudad.country);
        return;
      }

      if (country.id.toLowerCase() === countryIdCorrecto.toLowerCase()) {
        country.style.fill = "green";
        puntos += 10;
      } else {
        country.style.fill = "red";
        puntos -= 5;
      }

      indiceActual++;

      setTimeout(() => {
        actualizarUI();
      }, 600);

    });

  });

}


// 🔀 Mezclar array
function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
