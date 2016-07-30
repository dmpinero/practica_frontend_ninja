var $ = require('jquery');
var utils = require('./utils');	// Escapado de texto
var comentarios = require('./comentarios-carga');
var comentariosApiClient = require('./comentarios-api-client');
//console.log("Cargado formulario-alta-comentario.js");

// Validar textarea (Máximo de 120 palabras)
$('#comentario').on("keyup", function() {
	//console.log("Escrita palabra en textarea");
	var palabras = $(this).val().match(/\S+/g).length; // Contar el nº de palabras
	//console.log("palabras:", palabras);
    $('#contador_palabras')[0].innerHTML = palabras;
    $('#palabras_restantes')[0].innerHTML = 120 - palabras;

    // Cambiar estilo de las etiquetas
    // Si nº de palabras >= 100. Verde
    // Si nº de palabras >= 50 y < 100. Naranja
    // Si nº de palabras <= 10. Rojo
    var palabras_restantes = $('#palabras_restantes')[0].innerHTML;
    if (palabras_restantes < 10) {
    	$('#palabras_restantes').removeClass("menos-cien-palabras");
    	$('#palabras_restantes').addClass("menos-diez-palabras");
    } else if (palabras_restantes < 100) {    		
    		$('#palabras_restantes').removeClass("cien-o-mas-palabras");
    		$('#palabras_restantes').removeClass("menos-diez-palabras");
			$('#palabras_restantes').addClass("menos-cien-palabras");   		
    }
    else {
    	$('#palabras_restantes').removeClass("menos-cien-palabras");
    	$('#palabras_restantes').addClass("cien-o-mas-palabras");
    }
});

// Al hacer enviar formulario pulsando ENTER o hacer click en el botón de guardar enviamos una petición Ajax
$('#formulario-alta-comentario').on("submit", function() {
	//console.log("Submit del formulario");

	var palabras_restantes = $('#palabras_restantes')[0].innerHTML;
    if (parseInt(palabras_restantes) < 0)
    {
        alert("Número de palabras excedido");
        
        return false;  
    }
    else {
	    // Advertimos de éxito en el envío del formulario, simulando su envio.
	    alert('Formulario enviado con éxito');
	    
	    var inputs = $("#formulario-alta-comentario input"); // Almacenar todos los inputs del formulario
	    var textareas = $("#formulario-alta-comentario textarea"); // Almacenar todos los textarea del formulario

		// Comentario a crear
		var comentario = {
			nombre: utils.escapeHTML($("#nombre").val()),
			apellidos:  utils.escapeHTML($("#apellidos").val()),
			email: utils.escapeHTML($("#email").val()),
			comentario: utils.escapeHTML($("#comentario").val()) // Escapamos caracteres especiales
		};

   		//beforesend. Antes de realizar la llamada AJAX
	    function beforeSave() { // antes de enviar la petición
			console.log("beforeSave");
			$(inputs).attr("disabled", true); // Deshabilitar todos los inputs
			// Cambiar texto del botón y deshabilitar botón
			$('#formulario-alta-comentario button').text("Guardando comentario...").attr("disabled", true);	    
	    }

   		// complete. Al finalizar la llamada AJAX independientemente del resultado
    	function onComplete() {
    		console.log("onComplete");
			$(inputs).attr("disabled", false); // Habilitar todos los inputs
			$(textareas).attr("disabled", false); // Habilitar todos los textarea
			// Cambiar texto del botón y habilitar botón
			$('#formulario-alta-comentario button').text("Enviar").attr("disabled", false);    		
    	}

		// Petición Ajax para guardar la información en el backend
		comentariosApiClient.save(comentario, 
			function (response) {
				console.log ("SUCCESS", response);
					$("form")[0].reset(); // Limpiar formulario
					$("nombre").focus(); // Poner foco en el campo nombre

					// Recargamos los comentarios
					console.log ("Voy a recargar comentarios", response);
					comentarios.load();				
			}, function (response) {
				console.log ("ERROR", response);
		});		

	    return false;  
	}
	
});