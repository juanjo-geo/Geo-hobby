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


function iniciarJuego(svgDoc, countries) {

  // 🎨 Pintar todos gris
  countries.forEach(el => {
    el.style.fill = "#dcdcdc";
    el.style.cursor = "pointer";
  });

  // 🎯 Tomar 10 ciudades aleatorias
  const ciudadesSeleccionadas = mezclarArray(cities).slice(0, 10);

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

      if (country.id === ciudad.countryId) {
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


// 🔀 Función para mezclar ciudades
function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
