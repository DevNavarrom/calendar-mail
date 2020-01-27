const Servidor = require('./server/server');
const rutasPersonas = require('./routes/personas.router');

const servidor = new Servidor().getInstancia();

servidor.agregarRutas([
    { 'rutaRaiz': '/personas', 'enrutador': rutasPersonas }
]);

servidor.iniciar( () => console.log(`Servidor corriendo en el puerto ${ servidor.puerto }`) );



//FUNCIONAL
/*
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

var nodemailer = require('nodemailer');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

const port = process.env.PORT || 4300;

app.use(express.static(publicPath));

let io = socketIO(server);

io.on('connection', (client) => {
    console.log('>>Usuario Conectado.<<');

    client.on('disconnect', () => {
        console.log('<< USUARIO DESCONECTADO >>');
    });

    client.on('enviarMail', (mensaje) => {
        console.log(mensaje);
        sendMails(mensaje);
    });

    client.emit('enviarNombres',
        [
            {
                title: 'Deimer Jose Navarro Martinez',
                allDay: false,
                className: 'important'
            },
            {
                title: 'Wendy Navarro Martinez',
                allDay: false,
                className: 'success'
            }
        ]
    );

});

function sendMails(data) {
    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deimerjoe@gmail.com',
            pass: 'brasil921202'
        }
        
    });

    var mensaje = "Hola desde nodejs...";

    for (let i = 0; i < data.length; i++) {
        //const element = data[i];
        var mailOptions = {
            from: 'deimerjoe@gmail.com',
            to: data[i].email,
            subject: 'Tarjeta de Cumpleaños',
            text: mensaje
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }

}

server.listen(port, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor corriendo en el puerto ${ port }`);
});
*/