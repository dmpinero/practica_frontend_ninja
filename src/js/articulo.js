var $ = require('jquery');
//console.log("Cargado articulo.js");

// Click en el artículo. LLeva al detalle
$('.articulo').on("click", function() {
	window.location.href = 'detalle_articulo.html';
});


// Click en el número de comentarios. Lleva a la lista
// de comentarios del detalle del artículo
$('.autor-comentarios').on("click", function() {
	window.location.href = 'detalle_articulo.html#articulo-comentarios';
});