const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura de body
        this.app.use( express.json() );

        //Public
        this.app.use( express.static('public') )
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
