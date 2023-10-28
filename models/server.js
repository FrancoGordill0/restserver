const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.ConectarDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async ConectarDB() {
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura de body
        this.app.use( express.json() );

        //Public
        this.app.use( express.static('public') );
    }

    routes (){
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'))

    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }

}

module.exports = Server;