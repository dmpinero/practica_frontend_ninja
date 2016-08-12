var $ = require('jquery');
//console.log("Cargado fecha-hora.js");

var moment = require('moment');
var dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

//var fecha_hora_publicacion = $('#fecha-hora-publicacion1').val();
var fecha_hora_publicacion1 = $('#fecha-hora-publicacion1').text();
//console.log("fecha_hora_publicacion:" + fecha_hora_publicacion1);
var fecha_hora_publicacion2 = $('#fecha-hora-publicacion2').text();
var fecha_hora_publicacion3 = $('#fecha-hora-publicacion3').text();
var fecha_hora_publicacion4 = $('#fecha-hora-publicacion4').text();
var fecha_hora_publicacion5 = $('#fecha-hora-publicacion5').text();
var fecha_hora_publicacion6 = $('#fecha-hora-publicacion6').text();
var fecha_hora_publicacion7 = $('#fecha-hora-publicacion7').text();
var fecha_hora_publicacion8 = $('#fecha-hora-publicacion8').text();
var fecha_hora_publicacion9 = $('#fecha-hora-publicacion9').text();
var fecha_hora_publicacion10 = $('#fecha-hora-publicacion10').text();

// Cada segundo se calcula el tiempo transcurrido
$(document).ready(function() {   
   var refreshId = setInterval(actualizarDatos, 1000);
   $.ajaxSetup({ cache: false });
 });

// Función que calcula el tiempo transcurrido entre la fecha de publicación y la fecha actual
function actualizarDatos() {
	// Calcula tiempo transcurrido
	var tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion1);
	//console.log("tiempo transcurrido:" + tiempo_transcurrido);
	// Actualiza el valor del campo con el tiempo transcurrido
	$('#fecha-hora-publicacion1').text(tiempo_transcurrido);

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion2);
	$('#fecha-hora-publicacion2').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion3);
	$('#fecha-hora-publicacion3').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion4);
	$('#fecha-hora-publicacion4').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion5);
	$('#fecha-hora-publicacion5').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion6);
	$('#fecha-hora-publicacion6').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion7);
	$('#fecha-hora-publicacion7').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion8);
	$('#fecha-hora-publicacion8').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion9);
	$('#fecha-hora-publicacion9').text(tiempo_transcurrido);	

	tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion10);
	$('#fecha-hora-publicacion10').text(tiempo_transcurrido);							
}

function calcula_diferencia(fecha_hora_inicio)
{
	var fecha_hora_inicio = moment(fecha_hora_inicio, "DDMMYYYYHHmmss");
	//console.log("Calculando tiempo entre la fecha de publicación que vale " + fecha_hora_inicio.format("DDMMYYYY HH:mm:ss"));

	var fecha_hora_actual = moment();
	var diferencia_dias = fecha_hora_actual.diff(fecha_hora_inicio, "days");
	//console.log ("diferencia_dias:" + diferencia_dias);
	var diferencia_horas = fecha_hora_actual.diff(fecha_hora_inicio, "hours");
	var diferencia_minutos = fecha_hora_actual.diff(fecha_hora_inicio, "minutes");
	var diferencia_segundos = fecha_hora_actual.diff(fecha_hora_inicio, "seconds");

	//console.log ("Fecha y hora de inicio:" + fecha_hora_inicio.format("DDMMYYYY HH:mm:ss"));
	//console.log ("Son las " + fecha_hora_actual.format("DDMMYYYY HH:mm:ss"));

	if (diferencia_segundos > 0 && diferencia_segundos < 60) {
		//console.log ("diferencia en segundos:" + diferencia_segundos);
		
		var literal_segundos = "segundo";
		if (diferencia_segundos > 1) {
			literal_segundos = "segundos"
		}
		return "Hace " + diferencia_segundos + " " + literal_segundos;
	} else if (diferencia_minutos > 0 && diferencia_minutos < 60) {
		//console.log ("Publicado hace " + diferencia_minutos + " minutos");
		
		var literal_minutos = "minuto";
		if (diferencia_minutos > 1) {
			literal_minutos = "minutos"
		}
		return "Hace " + diferencia_minutos + " " + literal_minutos;
	} else if (diferencia_horas > 0 && diferencia_horas < 24) {
		//console.log ("diferencia en horas:" + diferencia_horas);
		var literal_horas = "hora";
		if (diferencia_horas > 1) {
			literal_horas = "horas"
		}

		return "Hace " + diferencia_horas + " " + literal_horas;
	} else if (diferencia_dias > 0 && diferencia_dias < 7) {		
		var dia_semana_sp = dias_semana[fecha_hora_inicio.day()];
		//console.log ("Día de la semana:" + dia_semana_sp);

		return "El " + dia_semana_sp;
	}
	else {
		return "El " + fecha_hora_inicio.format("DD/MM/YYYY") + " a las " + fecha_hora_inicio.format("HH:mm:ss");
	}
}