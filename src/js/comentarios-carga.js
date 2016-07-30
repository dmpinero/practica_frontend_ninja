var $ = require('jquery');
var utils = require('./utils');			// Escapado de texto	

var comentariosApiClient = require('./comentarios-api-client');

console.log("Cargado comentarios-carga.js");

module.exports = {
	load: function() {
		comentariosApiClient.load( 
			function(response) { // success
				//console.log("Comentarios", response);
				$('articulo-comentarios').html('');
				for (var i in response) {
			        var comentario = response[i];
			        var nombre = utils.escapeHTML(comentario.nombre || ""); // Si el atributo es undefined se reemplaza por la cadena vacía
			        var apellidos = utils.escapeHTML(comentario.apellidos || "") ; // Si el atributo es undefined se reemplaza por la cadena vacía 
			        var email = utils.escapeHTML(comentario.email || ""); // Si el atributo es undefined se reemplaza por la cadena vacía 
			        var comentario = utils.escapeHTML(comentario.comentario || ""); // Si el atributo es undefined se reemplaza por la cadena vacía
			        var html = '<article class="articulo-comentario">';
			        html += '<div class="articulo-autor-nombre">' + nombre + ' ' + apellidos + ' ' + '(' + email + ')' + '</div>';
			        html += '<div class="articulo-parrafo-resumen">' + comentario + '</div>' 
			        html += '</article>';
			        $('.articulo-comentarios').append(html);
			    }		
			}, function(response) { // error
				console.log("ERROR", response);
			}
		);
	}
}

// evento que se ejecuta cuando se mueve el scroll de la pagina
$(document).scroll(function() {
	console.log("scroll...");
	console.log("Posición de comentarios", $('#articulo-comentarios').position());
	console.log("Posición actual", $(document).scrollTop());

	if ($(document).scrollTop() >= 694) {
		comentariosApiClient.load();
	}
});