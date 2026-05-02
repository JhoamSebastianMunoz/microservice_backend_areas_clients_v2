import express from "express";
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"; 
import cors from "cors";

// importaciones de los servicios para zonas la cual esta relacionada con la tabla clientes
import register_area from './routes/areaRoutes/register_area';
import get_area from './routes/areaRoutes/get_area';
import get_areas from './routes/areaRoutes/get_areas';
import delete_area from './routes/areaRoutes/delete_area';
import update_area from './routes/areaRoutes/update_area';
// importaciones de los servicios para los clientes la cual se relaciona con la tabla de las zonas
import register_client from './routes/clientRoutes/register_client';
import get_clients from './routes/clientRoutes/get_clients';
import get_client from './routes/clientRoutes/get_client';
import delete_client from './routes/clientRoutes/delete_client';
import update_client from './routes/clientRoutes/update_client';
// importacion para asiganr zonas a un usuario
import get_dataArea from './routes/MicroserviceUser/get_dataArea';
import get_clientArea from './routes/MicroserviceUser/get_clientArea';
// importacion para obtener la informacion del microservicio product
import get_product from './routes/microserviceProductRoutes/get_product';
// importacion para enviar la informacion del cliente al microservicio preventa
import get_dataClient from './routes/microservicePresaleRoutes/get_dataClien';
// importacion para la gestion de solicitud de creacion de cliente
import requestCreateClient from './routes/clientCreationRequestRoutes/clientCreationRequestRoutes';
import getPendingRequest from './routes/clientCreationRequestRoutes/getPendingRequest';
import acceptOrRejectRequest from './routes/clientCreationRequestRoutes/acceptOrRejectRoutes'

import dotenv from "dotenv";

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


// Sentencia CRUD para Zonas de trabajo
app.use('/register-area', register_area);
app.use('/get-area', get_area);
app.use('/get-areas', get_areas);
app.use('/delete-area', delete_area);
app.use('/update-area', update_area);
// Sentencia CRUD para clientes
app.use('/register-client', register_client);
app.use('/get-clients', get_clients);
app.use('/get-client', get_client);
app.use('/delete-client', delete_client);
app.use('/update-client', update_client);
// Solicitud creación y aceptar cliente
app.use('/request-create-cliente', requestCreateClient);
app.use('/get-Pending-Request', getPendingRequest);
app.use('/accept-Reject-Request', acceptOrRejectRequest)
// Consulta para el microservicio usuarios
app.use('/get_dataArea', get_dataArea);
app.use('/get_clientArea', get_clientArea);
// Consultar un producto de otro microservicio por ID
// app.use('/get-product', get_product);

// consultar datos cliente para el microservicio preventa
app.use('/client', get_dataClient);

// Configuración del puerto por donde correrá la aplicación
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
}).on("error", (error) => {
  throw new Error(error.message);
});
