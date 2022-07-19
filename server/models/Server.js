import express from 'express';
import cors from 'cors';
import login from '../controllers/auth.js'
import dbConnection from '../db/connection.js';

class Server {
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT

    // Paths 
    this.path = {
      auth: '/auth',
      register: '/register'
    }

    // Ejecutar la funcion de middlewares
    this.middlewares();

    // Conectar a la base de datos
    this.connectionMongo();
    
    // Rutas de la aplicacion
    this.routes();
  }

  middlewares(){
    //CORS (Intercambio de Recursos de Origen Cruzado)
    this.app.use(cors());

    //lectura y parseo del body con .json
    this.app.use(express.json());

    //TODO: poder cargar archivos con fileUpload()
  }

  async connectionMongo(){
    await dbConnection();
  }

  routes(){
    this.app.use(this.path.auth, login);
    // this.app.use(this.path.register, import('../routes/register'));
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    })
  }

}

export default Server;