import express from "express";
import colors from 'colors';
import swaggerUi from "swagger-ui-express";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan';
import swaggerSpec, { swaggerUiOption } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Concetar a base de datos

export async function conectDB() {
  try{
    await db.authenticate();
    db.sync();
    //console.log(colors.blue('Conexion exitosa a la base de datos'));
  } catch(error) {
    //console.log(error);
    console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'))
  }
}

conectDB();

// Instanacia de express 
const server = express();

// Permitir conexiones
const CorsOptions : CorsOptions = {
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  }
}

server.use(cors(CorsOptions))
//Leer datos de formulario
server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOption))

export default server;