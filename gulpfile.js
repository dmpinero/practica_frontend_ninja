var gulp = require('gulp'); // Importa gulp de la carpeta node_modules
var sass = require('gulp-sass'); // Importa gulp-sass
var notify = require('gulp-notify'); // Notificaciones de escritorio
var browserSync = require('browser-sync').create();

// Definimos tarea por defecto
gulp.task("default", ["compile-sass"], function(){
	// iniciar BrowserSync
	browserSync.init({
		server: "./", // levanta servidor web en la carpeta actual
		browser: "google chrome"
	});

	// observa cambios en archivos SASS y ejecuta la tarea de compilación
	gulp.watch("src/scss/*.scss", ["compile-sass"]); // Observa cambios en SASS , si se producen se ejecuta la tarea compile-sass

	// observa cambios en archivos HTML y recarga el navegador
	gulp.watch("*.html").on("change", browserSync.reload);	

});

// Definimos tarea para compilar SASS
gulp.task("compile-sass", function(){
	gulp.src("src/scss/style.scss") // cargamos el archivo
	.pipe(sass().on('error', sass.logError)) // compilamos el archivo sass. En caso de error lo muestra por el log
	.pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
	.pipe(notify({
		title: "SASS",
		message: "Compiled!!"
	}))
	.pipe(browserSync.stream());
});