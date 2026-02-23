document.addEventListener("DOMContentLoaded", function () {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", function () {

    const svgDoc = worldObject.contentDocument;
    const paths = svgDoc.querySelectorAll("path");

    console.log("SVG cargado correctamente");
    console.log("Cantidad de países:", paths.length);

    if (!paths || paths.length === 0) {
      console.log("No se encontraron paths");
      return;
    }

    iniciarJuego(paths);

  });

});


function iniciarJuego(paths) {

  // 🎨 Pintar todos los países gris claro
  paths.forEach(path => {
    path.style.fill = "#dcdcdc";
  });

  // 🧪 Prueba: pintar uno aleatorio azul
  const randomIndex = Math.floor(Math.random() * paths.length);
  paths[randomIndex].style.fill = "steelblue";

  console.log("Mapa pintado correctamente");
}
