document.addEventListener("DOMContentLoaded", function () {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", function () {

    const svgDoc = worldObject.contentDocument;
    const countries = svgDoc.querySelectorAll("path, polygon");

    if (!countries || countries.length === 0) {
      console.log("No se encontraron países");
      return;
    }

    iniciarJuego(svgDoc, countries);

  });

});


// 🔁 Mapeo país texto → id real del SVG
const countryMap = {
  "España": "ES",
  "Colombia": "CO",
  "USA": "US",
  "Japón": "JP",
  "Italia": "IT",
  "Alemania": "DE",
  "Perú": "PE",
  "Chile": "CL",
  "Canadá": "CA"
};


function iniciarJuego(svgDoc, countries) {

  countries.forEach(el => {
    el.style.fill = "#dcdcdc";
    el.style.cursor = "pointer";
  });

  const ciudadesSeleccionadas = mezclarArray(cities).slice(0, 5);

  let indiceActual = 0;
  let puntos = 0;

  mostrarCiudad();

  function mostrarCiudad() {
    if (indiceActual >= ciudadesSeleccionadas.length) {
      alert("Juego terminado. Puntos: " + puntos);
      return;
    }

    const ciudad = ciudadesSeleccionadas[indiceActual];
    document.getElementById("cityName").textContent = ciudad.name;
  }

  countries.forEach(country => {

    country.addEventListener("click", function () {

      const ciudad = ciudadesSeleccionadas[indiceActual];
      const countryIdCorrecto = countryMap[ciudad.country];

      if (!countryIdCorrecto) {
        console.log("País no mapeado:", ciudad.country);
        return;
      }

      if (country.id === countryIdCorrecto) {
        country.style.fill = "green";
        puntos += 10;
      } else {
        country.style.fill = "red";
        puntos -= 5;
      }

      indiceActual++;
      setTimeout(mostrarCiudad, 500);

    });

  });

}


function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
