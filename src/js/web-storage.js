var $ = require('jquery');
//console.log("Cargado web-storage.js");

// Recuperar el número de "Me gusta" de cada elemento al cargar
// la página
$(document).ready(function() {   
	for (i=1; i<11; i++)
	{
		var id_articulo = 'articulo' + i + '-me-gusta';
		var meGustaElemento = " "+ getMegusta(id_articulo);	
		//$('#' + id_articulo).text(meGustaElemento);
		$('#' + 'texto-' + id_articulo).text(meGustaElemento);
	}
 });

// Función que recupera el número de "Me gusta" de un elemento
function getMegusta(elemento)
{
	if (typeof(Storage) !== "undefined") { // El navegador soporta Web Storage
		//console.log("Este navegador soporta Web Storage");

		// Obtener los "Me gusta" almacenados para el artículo
		var total_me_gusta = Number(localStorage.getItem(elemento));
		//console.log("Este artículo " + elemento + " tiene " + total_me_gusta + " me gusta");

		return total_me_gusta;
	}	
	else { // El navegador no soporta Web Storage
		//console.log("Este navegador no soporta Web Storage");
		return -1;
	}	
}