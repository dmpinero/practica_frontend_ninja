//console.log("Cargado cabecera.js");
var $ = require('jquery');

// Buscador
$(function () {
    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    // Pulsación en el elemento de menú "Buscar"
    $('#myNavbar a[href="#search"]').on('click', function(event) {
        //console.log("Pulsado en buscar");
        $('.navbar-toggle').click();
    });

    //Do not include! This prevents the form from submitting for DEMO purposes only!
    $('form').submit(function(event) {
        event.preventDefault();
        return false;
    })
});