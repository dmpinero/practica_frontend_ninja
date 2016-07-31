var $ = require('jquery');
//console.log("Cargado cabecera.js");

$('#icono_menu_sustituto').on("click", function() {
	console.log("Click en menú de categoría");
	$( ".categoria" ).toggleClass( "visualizar_categoria ");
});