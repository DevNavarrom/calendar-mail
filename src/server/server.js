
const express = require('express');
const http = require('http');
const path = require('path');
//var morgan = require('morgan');
const bodyParser = require('body-parser');
//const socketIO = require('socket.io');

class Servidor {

    constructor(puerto) {
        this.puerto = process.env.PORT || puerto;
        this.app = express();
        this.publicPath = path.resolve(__dirname, '../../public');

        this.app.use( function (req, res, next) {
            // Permite a cualquier origen conectarse
            res.setHeader('Access-Control-Allow-Origin', '*');
        
            // Los metodos permitidos
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Headers permitidas
            res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type');

            // Pasamos a los siguientes middlewares
            next();
        });

        //this.app.use( morgan('dev') );// utilizamos morgan para ver los logs del server en su modo dev

        // para soportar json encode bodys en las peticiones
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded({ extended: true }));

        this.app.use(express.static(this.publicPath));

        this.server = http.createServer(this.app);// creamos un servidor http manejado por express
    }

    agregarRutas( rutas ) {
        rutas.forEach( ruta => {
            this.app.use(ruta.rutaRaiz, ruta.enrutador);
        });
    }

    iniciar( callback ) {
        this.server.listen(this.puerto, callback);

        /*let io = socketIO(this.server);
        //let io = require('socket.io')(this.server);

        io.on('connection', (client) => {
            console.log('>>Usuario Conectado.<<');

            client.on('disconnect', () => {
                console.log('<< USUARIO DESCONECTADO >>');
            });

            client.on('enviarMail', (mensaje) => {
                console.log(mensaje);
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
 
        });*/
    }

}

class Singleton {

    constructor() {
        if ( !Singleton.instancia ) {
            Singleton.instancia = new Servidor(4300);
        }
    }

    getInstancia() {
        return Singleton.instancia;
    }

}

module.exports = Singleton;
