/*const conexion = require("../data/database");

module.exports = {
    async obtener() {
        const resultados = await conexion.query("select * from sigec.correos");
        return resultados.rows;
    },
}*/


//https://github.com/parzibyte/crud-postgresql-node/blob/master/models/productos.js

const PostgreSql = require('../data/database');

class PersonaModel {

    static async get() {
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `SELECT * FROM sigec.correos`,  
        );

        return res.rows;
    }

    static async updateEnvio(id, anio){
        let postgresql = new PostgreSql().getInstancia();

        let res = await postgresql.query(
            `UPDATE sigec.correos SET envio = $1 WHERE id = $2`, [anio, id]
        );

        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }


}

module.exports = PersonaModel;