var $ = require('jquery');
//console.log("Cargado articulo-enlace.js");

$('.articulo').on("click", function() {
	window.location.href = 'detalle_articulo.html';
});

// Recuperar el número de "Me gusta" de cada elemento al cargar
// la página
$(document).ready(function() {   
	for (i=1; i<11; i++)
	{
		var id_articulo = 'articulo' + i + '-me-gusta';
		var meGustaElemento = getMegusta(id_articulo);	
		$('#' + id_articulo).text(meGustaElemento);
	}
   //var meGustaElemento = getMegusta('articulo1-me-gusta');
   //$('#articulo1-me-gusta').text(meGustaElemento);
 });

$('body').click(function(event) {
	console.log("Pulsado en " + event.target.id);
	//console.log("Más info:" + $(event.target));
	var total_me_gusta = Number(localStorage.getItem(event.target.id)) + 1;
	console.log("total_me_gusta para elemento " + event.target.id + " es " + total_me_gusta);
	
	$('#' + event.target.id).text(total_me_gusta); // Recargar div del elemento
	//$('#articulo1-me-gusta').text(total_me_gusta); // Esto funciona

	localStorage.setItem(event.target.id, total_me_gusta);
});

// Pulsando en "Me gusta" se aumenta el número 
/*
$('.articulo1-me-gusta').on("click", function(event) {
	console.log("El artículo "+ event.target.id + " me gusta");
	
	var meGustaElemento1 = getMegusta(null);
	if (meGustaElemento1 != -1) // En lavegador soporta Web Storage
	{
		meGustaElemento1 = meGustaElemento1 + 1;
		localStorage.setItem("articulo1-me-gusta", meGustaElemento1);
		$('#articulo1-me-gusta').text(meGustaElemento1);
	}
		
});
*/

// Función que recupera el número de "Me gusta" de un elemento
function getMegusta(elemento)
{
	if (typeof(Storage) !== "undefined") { // El navegador soporta Web Storage
		console.log("Este navegador soporta Web Storage");

		// Obtener los "Me gusta" almacenados para el artículo
		var total_me_gusta = Number(localStorage.getItem(elemento));
		console.log("Este artículo " + elemento + " tiene " + total_me_gusta + " me gusta");

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