/*const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "unicordoba",
  password: "brasileno921202",
  port: 5432,
});
module.exports = pool;*/

//---------------------------------------------------------------------------------------------
const { Client } = require('pg')
//const connectionString = 'postgresql://postgres:brasileno921202@localhost:5432/unicordoba'
const connectionString = 'postgresql://pbjwhdalpysmey:6c09cfc87e7f1baf3a452fb1f367b7e206d648e81943d89e5342ddc5839b2f27@ec2-3-224-165-85.compute-1.amazonaws.com:5432/dbgpmnkqpc4ln0'

class PostgreSql {

  constructor() {
      this.conexion = new Client({
        connectionString: connectionString,
    });

      this.conexion.connect( err => {
          if (err) {
              console.log('Error en la conexión de la base de datos', err);
              return;
          }

          console.log('Base de datos conectada correctamente');
      });
  }

  query(sql, args) {
      return new Promise( (resolve, reject) => {
          this.conexion.query(sql, args, (error, filas) => {
              if (error) return reject(error);

              resolve(filas);
          });
      });
  }

  close() {
      return new Promise( (resolve, reject) => {
          this.conexion.end( err => {
              if (err) return reject(error);

              resolve();
          });
      });
  }
}

class Singleton {
  constructor() {
      if ( !Singleton.instancia ) {
          Singleton.instancia = new PostgreSql();
      }
  }

  getInstancia() {
      return Singleton.instancia;
  }
}

module.exports = Singleton;
