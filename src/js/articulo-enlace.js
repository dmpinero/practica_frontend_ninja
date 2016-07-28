var $ = require('jquery');

$('.articulo').on("click", function() {
	window.location.href = 'detalle_articulo.html';
});

// Pulsando en "Me gusta" se aumenta el número 
$('.articulo-me-gusta').on("click", function() {
	console.log("Este artículo me gusta");
});


// Pulsando en el número de comentarios lleva a la lista
// de comentarios del detalle del artículo
$('.autor-comentarios').on("click", function() {
	window.location.href = 'detalle_articulo.html#comentarios';
});