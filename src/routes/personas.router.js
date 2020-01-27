const express = require('express');
//const router = express.Router();
const Router = require('express');
const PersonaModel = require("../models/personas");
const rutas = Router();
var nodemailer = require('nodemailer');
/*router.get('/', function (req, res, next) {
    PersonaModel
        .obtener()
        .then(correos => {
            res.render("correos/ver", {
                correos: correos,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo correos::"+err);
        });

});*/

function sendMails(data) {
    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuemail@gmail.com',
            pass: 'tupassword'
        }
        
    });

    var mensaje = "Hola desde nodejs...";
    contentHTML = `<div>
    <img src="../assets/card.jpeg">
    </div>`;

    var mailOptions = {
        from: 'tuemail@gmail.com',
        to: data,
        subject: 'Tarjeta de Cumpleaños',
        html: '<img src="http://159.65.228.145/imagesigec/card.jpeg"/>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}

/* [ INICIO ] RUTAS POR GET */
rutas.get('', (req, res) => {
    
    var dt = new Date();

    PersonaModel.get()
        .then( resSelect => {

            res.json({
                'okay': true,
                'correos': resSelect
            });
            for (let i = 0; i < resSelect.length; i++) {
                //const element = array[i];
                var d = new Date(resSelect[i].fecha);
                if ((d.getMonth() == dt.getMonth()) && (d.getDate() == dt.getDate()) && (resSelect[i].envio == dt.getFullYear())) {
                    sendMails(resSelect[i].correo);
                    if (PersonaModel.updateEnvio(resSelect[i].id, dt.getFullYear() + 1)) {
                        console.log('<< Año de Envio Actualizado >>'+resSelect[i].id);
                        console.log('<< Año de Envio Actualizado >>'+(dt.getFullYear()+1));
                    }
                }
            }
        })
        .catch( err => {
            console.log(' >>>> ERROR AL OBTENER LOS CORREOS ', err);

            res.json({
                'okay': false,
                'error': 'Error al obtener los correos'
            });
        });
});

rutas.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '../../public/index.html');
});


//module.exports = router;
module.exports = rutas;