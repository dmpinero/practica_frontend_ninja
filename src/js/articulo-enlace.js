var $ = require('jquery');
//console.log("Cargado articulo-enlace.js");

$('.articulo').on("click", function() {
	window.location.href = 'detalle_articulo.html';
});

// Recuperar el número de "Me gusta" de cada elemento al cargar
// la página
$(document).ready(function() {   
   var meGustaElemento1 = getMegusta(null);
   $('#articulo1-me-gusta').text(meGustaElemento1);
 });


// Pulsando en "Me gusta" se aumenta el número 
$('.articulo1-me-gusta').on("click", function() {
	console.log("Este artículo me gusta");
	
	var meGustaElemento1 = getMegusta(null);
	if (meGustaElemento1 != -1) // En lavegador soporta Web Storage
	{
		meGustaElemento1 = meGustaElemento1 + 1;
		localStorage.setItem("articulo1-me-gusta", meGustaElemento1);
		$('#articulo1-me-gusta').text(meGustaElemento1);
	}
		
});

// Función que recupera el número de "Me gusta" de un elemento
function getMegusta(elemento)
{
	if (typeof(Storage) !== "undefined") { // El navegador soporta Web Storage
		console.log("Este navegador soporta Web Storage");

		// Obtener los "Me gusta" almacenados para el artículo
		var total_me_gusta = Number(localStorage.getItem("articulo1-me-gusta"));
		console.log("Este artículo tiene " + total_me_gusta + " me gusta");

		return total_me_gusta;
	}	
	else { // El navegador no soporta Web Storage
		console.log("Este navegador no soporta Web Storage");
		return -1;
	}	
}

// Pulsando en el número de comentarios lleva a la lista
// de comentarios del detalle del artículo
$('.autor-comentarios').on("click", function() {
	window.location.href = 'detalle_articulo.html#comentarios';
});