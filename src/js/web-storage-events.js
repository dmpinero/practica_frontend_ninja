var $ = require('jquery');

// Detectar pulsación sobre "Me gusta" en un artículo
$('.articulo-me-gusta').on("click", function(event) {
	console.log("Pulsado en " + event.target.id);
	var total_me_gusta = Number(localStorage.getItem(event.target.id)) + 1;
	//console.log("total_me_gusta para elemento " + event.target.id + " es " + total_me_gusta);
		
	$('#' + event.target.id).text(total_me_gusta); // Recargar div del elemento
	localStorage.setItem(event.target.id, total_me_gusta); // Actualizar Web Storage
});