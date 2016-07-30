var $ = require('jquery');

module.exports = {
	save: function(comentario, successCallback, errorCallback) {
		// Petición Ajax para guardar la información en el backend
		$.ajax({
			url: "/api/comentarios/", // URL de petición
			method: "post",      	  // Creación del comentario	
			data: comentario, 		  // Información del comentario
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