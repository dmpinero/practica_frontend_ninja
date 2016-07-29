var $ = require('jquery');
//console.log("Cargado articulo-enlace.js");

$('.articulo').on("click", function() {
	window.location.href = 'detalle_articulo.html';
});


// Pulsando en el número de comentarios lleva a la lista
// de comentarios del detalle del artículo
$('.autor-comentarios').on("click", function() {
	window.location.href = 'detalle_articulo.html#comentarios';
});