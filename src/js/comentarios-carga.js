var $ = require('jquery');
var utils = require('./utils');			// Escapado de texto	

var comentariosApiClient = require('./comentarios-api-client');

//console.log("Cargado comentarios-carga.js");
var blnPrimeraCarga = true;

function pintarComentarios(response) {
	//console.log("Voy a pintar los comentarios",response);
	if (blnPrimeraCarga) {
		$('.articulo-comentarios').html('');
		var cabecera = '<div class="row"><h2>Lista de comentarios</h2></div>';
		var html = cabecera;
		for (var i in response) {
		    var comentario = response[i];
		    var nombre = utils.escapeHTML(comentario.nombre || ""); // Si el atributo es undefined se reemplaza por la cadena vacía
		    var apellidos = utils.escapeHTML(comentario.apellidos || "") ; // Si el atributo es undefined se reemplaza por la cadena vacía 
		    var email = utils.escapeHTML(comentario.email || ""); // Si el atributo es undefined se reemplaza por la cadena vacía 
		    var comentario = utils.escapeHTML(comentario.comentario || ""); // Si el atributo es undefined se reemplaza por la cadena vacía			        
			html += '<div class="row" id="articulo_comentario">';
			html += '<div class="col-sm-2 text-center">';
			html += '<img src="img/bandmember.jpg" class="img-circle" height="65" width="65" alt="Avatar">';
			html += '</div>';
			html += '<div class="col-sm-10">';
			html += '<h4>' + nombre + ' ' + apellidos + '<small>' + ' (' + email + ')' + '</small></h4>';
			html += '<p>' + comentario + '</p>';
			html += '</div>';
			html += '</div>';
			html += '</article>';
		}

		 $('.articulo-comentarios').append(html);
		 blnPrimeraCarga = false;
	}
}

module.exports = {
	load: function() {
		comentariosApiClient.load( 
			function(response) { // success
				//console.log("Comentarios", response);
				blnPrimeraCarga = true;
				pintarComentarios(response);
			}, function(response) { // error
				console.log("ERROR", response);
			}
		);
	}
}

// evento que se ejecuta cuando se mueve el scroll de la pagina
$(document).scroll(function() {
	//console.log("scroll...");
	//console.log("Posición de comentarios", $('#articulo-comentarios').position());
	//console.log("Posición actual", $(document).scrollTop());

	if ($(document).scrollTop() >= 694 && blnPrimeraCarga) {
		//console.log("Cargo comentarios por scroll");
		comentariosApiClient.load( 
			function(response) { // success
				//console.log("Comentarios", response);
				pintarComentarios(response);
			}, function(response) { // error
				console.log("ERROR", response);
			}
		);		
	}
});