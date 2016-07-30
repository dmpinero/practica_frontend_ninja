var $ = require('jquery');

module.exports = {
	save: function(comentario, successCallback, errorCallback) {
		// Petición Ajax para guardar la información en el backend
		$.ajax({
			url: "/api/comentarios/", // URL de petición
			method: "post",      	  // Creación del comentario	
			data: comentario, 		  // Información del comentario
			/*
			beforeSend: function() { // Ejecución antes de la petición Ajax
				$(inputs).attr("disabled", true); // Deshabilitar todos los inputs
				// Cambiar texto del botón y deshabilitar botón
				$('#formulario-alta-comentario button').text("Guardando comentario...").attr("disabled", true);
			},
			success: function (response) { // Función callback cuando la petición sea exitosa
				console.log ("SUCCESS", response);
				$("form")[0].reset(); // Limpiar formulario
				$("nombre").focus(); // Poner foco en el campo nombre

				// Recargamos los comentarios
				console.log ("Voy a recargar comentarios", response);
				comentarios.load();
			},
			error: function (response) {
				console.log ("ERROR", response);	
			},		
			complete: function() { // Petición Ajax finalizada en cualquier circunstancia (success o error)
				$(inputs).attr("disabled", false); // Habilitar todos los inputs
				$(textareas).attr("disabled", false); // Habilitar todos los textarea
				// Cambiar texto del botón y habilitar botón
				$('#formulario-alta-comentario button').text("Enviar").attr("disabled", false);
			}
			*/
			success: successCallback,
			error: errorCallback		
		});
	},
	load: function(successCallback, errorCallback) {
		$.ajax({
			cache: true,
			method: "get",
			url: "/api/comentarios/?_order=id",
			success: successCallback,
			error: errorCallback
		});
	}	
};