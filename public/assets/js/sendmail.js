//var io = require('socket.io/socket.io.js');
//import io from "socket.io/socket.io.js";

/*var socket = io();

socket.on('connect', function() {
    console.log('++Conectado al Servidor++');
});
socket.on('disconnect', function() {
    console.log('--Conexion perdida--');
});

//Enviar Info
socket.emit('enviarMail', 
[
    {email: 'cleveridea2014@gmail.com'},
    {email: 'cleveridea2018@gmail.com'},
    {email: 'alvarezhernandezcristian1@gmail.com'}
]);

//Recibir Nombres
socket.on('enviarNombres', function(nombres) {
    console.log(nombres);
});*/
$.getJSON("http://localhost:4300/personas").done(function(data) {
            console.log(data);
});

/*
(function() {

    $.fn.getEvents = function() {
        var info = [];

        $.getJSON("http://localhost:4300/personas").done(function(data) {
            var events = new Array(data.correos.length);
            $.each( data.correos, function( i, item ) {
        
                var d = new Date(item.fecha);
                var st = new Date() <= d.getFullYear() ? "success" : "important";
                events[i] = {
                    title: item.nombres,
                    start: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
                    className: st
                };
                info = events;
                //return events;
            });
            
            //info = events;
            return info;
        });
    }
    
    //console.log(info);
    //return info;
})(jQuery);*/
