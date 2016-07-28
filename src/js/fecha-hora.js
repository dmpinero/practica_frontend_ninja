var $ = require('jquery');
var moment = require('moment');

var fecha_hora_publicacion = $('#fecha-hora-publicacion').val();
console.log("fecha y hora de publicación:" + fecha_hora_publicacion);

var tiempo_transcurrido = calcula_diferencia(fecha_hora_publicacion);
console.log (tiempo_transcurrido);

$('#fecha-hora-publicacion').val(tiempo_transcurrido);

function calcula_diferencia (fecha_hora_inicio)
{
	//var fecha_hora_inicio = moment("27072016210719", "DDMMYYYYHHMMss");
	var fecha_hora_inicio = moment(fecha_hora_inicio, "DDMMYYYYHHMMss");
	var fecha_hora_actual = moment();
	var diferencia_dias = fecha_hora_actual.diff(fecha_hora_inicio, "days");
	var diferencia_horas = fecha_hora_actual.diff(fecha_hora_inicio, "hours");
	var diferencia_minutos = fecha_hora_actual.diff(fecha_hora_inicio, "minutes");
	var diferencia_segundos = fecha_hora_actual.diff(fecha_hora_inicio, "seconds");

	console.log ("Fecha y hora de inicio:" + fecha_hora_inicio.format("DDMMYYYY HH:MM:ss"));
	console.log ("Son las " + fecha_hora_actual.format("DDMMYYYY HH:MM:ss"));

	if (diferencia_segundos > 0 && diferencia_segundos < 60) {
		console.log ("diferencia en segundos:" + diferencia_segundos);
		
		var literal_segundos = "segundo";
		if (diferencia_segundos > 1) {
			literal_segundos = "segundos"
		}
		return "Publicado hace " + diferencia_segundos + " " + literal_segundos;
	} else if (diferencia_minutos > 0 && diferencia_minutos < 60) {
		console.log ("Publicado hace " + diferencia_minutos + " minutos");
		
		var literal_minutos = "minuto";
		if (diferencia_minutos > 1) {
			literal_minutos = "minutos"
		}
		return "Publicado hace " + diferencia_minutos + " " + literal_minutos;
	} else if (diferencia_horas > 0 && diferencia_horas < 24) {
		console.log ("diferencia en horas:" + diferencia_horas);
		var literal_horas = "hora";
		if (diferencia_horas > 1) {
			literal_horas = "horas"
		}

		return "Publicado hace " + diferencia_horas + " " + literal_horas;
	} else {
		console.log ("diferencia en días:" + diferencia_dias);
		
		return diferencia_dias;
	}
}