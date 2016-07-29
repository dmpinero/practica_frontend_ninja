var gulp = require('gulp'); // Importa gulp de la carpeta node_modules
var sass = require('gulp-sass'); // Importa gulp-sass
var notify = require('gulp-notify'); // Notificaciones de escritorio
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');

// Variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

// Definimos tarea por defecto
gulp.task("default", ["concat-js", "compile-sass"], function(){
	// iniciar BrowserSync
	browserSync.init({
		//server: "./", // levanta servidor web en la carpeta actual
		proxy: "127.0.0.1:8000", // Actúa como proxy enviando las peticiones a SparREST
		browser: "google chrome" // Navegador web por defecto
	});

	// observa cambios en archivos SASS y ejecuta la tarea de compilación
	gulp.watch("src/scss/*.scss", ["compile-sass"]); // Observa cambios en SASS , si se producen se ejecuta la tarea compile-sass

	// observa cambios en archivos HTML y recarga el navegador
	gulp.watch("*.html").on("change", browserSync.reload);	

	// observa cambios en archivos JS para concatenar
	gulp.watch(jsFiles, ["concat-js"]);	

});

// Definimos tarea para compiplar SASS
gulp.task("compile-sass", function(){
	gulp.src("./src/scss/style.scss") // cargamos el archivo
	.pipe(sass().on('error', sass.logError)) // compilamos el archivo sass. En caso de error lo muestra por el log
	.pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
	.pipe(notify({
		title: "SASS",
		message: "Compiled!!"
	}))
	.pipe(browserSync.stream());
});

// definimos la tarea para concatenar JS
gulp.task("concat-js", function(){
	gulp.src("src/js/app.js")
    .pipe(tap(function(file){ // tap nos permite ejecutar un código por cada fichero seleccionado en el paso anterior
        file.contents = browserify(file.path).bundle(); // pasamos el archivo por browserify para importar los require
    }))
    .pipe(buffer()) // convertir cada archivo en un stream
    .pipe(gulp.dest("dist/js/"))
    .pipe(notify({
        title: "JS",
        message: "Concatenated!!"
    }))
    .pipe(browserSync.stream());
});