var gulp = require('gulp'); // Importa gulp de la carpeta node_modules
var sass = require('gulp-sass'); // Importa gulp-sass
var notify = require('gulp-notify'); // Notificaciones de escritorio
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');

// Variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

// Ruta de las imágenes
var imageDirs = ["src/img/*"];

// Definimos tarea por defecto
gulp.task("default", ["concat-js", "compile-sass", "assets-optimize-images"], function(){
	// iniciar BrowserSync
	browserSync.init({
		//server: "./", // levanta servidor web en la carpeta actual
		proxy: "127.0.0.1:8000", // Actúa como proxy enviando las peticiones a SparREST
		browser: "google chrome" // Navegador web por defecto
	});

	// observar cambios en archivos SASS y ejecuta la tarea de compilación
	gulp.watch("src/scss/*.scss", ["compile-sass"]); // Observa cambios en SASS , si se producen se ejecuta la tarea compile-sass

	// observar cambios en archivos HTML y recarga el navegador
	gulp.watch("*.html").on("change", browserSync.reload);	

	// observa cambios en archivos JS para concatenar
	gulp.watch(jsFiles, ["concat-js"]);

	// observar cambios en cualquier imagen y lanzar la optimización
	gulp.watch(imageDirs, ["assets-optimize-images"]);
});

// Definimos tarea para compiplar SASS
gulp.task("concat-js", function(){
    gulp.src("src/js/app.js")
    .pipe(sourcemaps.init()) // comenzamos la captura de sourcemaps
    .pipe(tap(function(file){ // tap nos permite ejecutar un código por cada fichero seleccionado en el paso anterior
        file.contents = browserify(file.path).bundle(); // pasamos el archivo por browserify para importar los require
    }))
    .pipe(buffer()) // convertir cada archivo en un stream
    .pipe(uglify()) // minifica el javascript
    .pipe(sourcemaps.write('./')) // escribimos los sourcemaps
    .pipe(gulp.dest("dist/js/")) // guardamos el archivo en dist/js
	.pipe(notify({
		title: "SASS",
		message: "Concatenated 🤘"
	}))
	.pipe(browserSync.stream());
});

// Definimos la tarea para compilar SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // cargamos le archivo
    .pipe(sourcemaps.init()) // comenzamos la captura de sourcemaps
    .pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS
    .pipe(postcss([
        autoprefixer(), // autoprefija automáticamente el CSS
        cssnano() // minifica el CSS
    ]))
    .pipe(sourcemaps.write('./')) // escribimos los sourcemaps
    .pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
    .pipe(notify({
        title: "SASS",
        message: "Compiled 🤘"
    }))
    .pipe(browserSync.stream());
});

// Definimos la tarea para optimizar imagenes de usuario
gulp.task("assets-optimize-images", function(){
    gulp.src(imageDirs)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/')); // Ruta de las imágenes optimizadas
});