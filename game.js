document.addEventListener("DOMContentLoaded", function () {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", function () {

    const svgDoc = worldObject.contentDocument;
    const paths = svgDoc.querySelectorAll("path");

    console.log("SVG cargado correctamente");
    console.log("Cantidad de países:", paths.length);

    iniciarJuego(paths);

  });

});


function iniciarJuego(paths) {

  if (!paths || paths.length === 0) {
    console.log("No se encontraron paths");
    return;
  }

  alert("Juego iniciado correctamente 🚀");

}
