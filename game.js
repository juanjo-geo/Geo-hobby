document.addEventListener("DOMContentLoaded", function () {

  const worldObject = document.getElementById("worldObject");

  worldObject.addEventListener("load", function () {

    const svgDoc = worldObject.contentDocument;

    const paths = svgDoc.querySelectorAll("path, polygon");

    console.log("Elementos encontrados:", paths.length);

    if (!paths || paths.length === 0) {
      console.log("No se encontraron elementos");
      return;
    }

    iniciarJuego(paths);

  });

});


function iniciarJuego(paths) {

  paths.forEach(el => {
    el.style.fill = "#dcdcdc";
  });

  const randomIndex = Math.floor(Math.random() * paths.length);
  paths[randomIndex].style.fill = "steelblue";

  console.log("Mapa pintado correctamente");
}
