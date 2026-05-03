import express from "express";
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"; 
import cors from "cors";

import dotenv from "dotenv";
// Importación de rutas API v2 consolidadas
import apiV2Routes from './routes/v2';

dotenv.config();

const app = express().use(bodyParser.json());

// Cargar archivo YAML de Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
// verificar si el servidor esta funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});
// Montar la documentación Swagger en la ruta `/api-docs`
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',  // Frontend en desarrollo
  'https://microservicebackendareasclientsv2-production.up.railway.app/',// Dominio de Railway después del deploy 
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  credentials: true
};
app.use(cors(corsOptions));


// Nuevas rutas API v2 (RESTful - Consolidadas)
app.use('/api/v2', apiV2Routes);

// Configuración del puerto por donde correrá la aplicación
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
}).on("error", (error) => {
  throw new Error(error.message);
});
