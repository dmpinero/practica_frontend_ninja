var $ = require('jquery');
console.log("Cargado comentarios-carga.js");

$.ajax({
	url: "/api/comentarios/",
	success: function(response) {
		console.log("Comentarios", response);
		for (var i in response) {
            var comentario = response[i];

            var html = '<article class="articulo-comentario">';
            html += '<div class="articulo-autor-nombre">' + comentario.nombre + ' ' + comentario.apellidos + ' ' + '(' + comentario.email + ')' + '</div>';
            html += '<div class="articulo-parrafo-resumen">' + comentario.comentario + '</div>' 
            html += '</article>';
            $('.articulo-comentarios').append(html);
        }		

        // Actualizo el literal del número de comentarios con el número de elementos almacenados
       $('#comentarios-detalle-numero')[0].innerHTML = response.length;
	},
	error: function(response) {
		console.log("ERROR", response);
	}
});