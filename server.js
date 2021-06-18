import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routers from './routes/index.js';

const app = express();
dotenv.config();

const { PORT, URI } = process.env;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Tai's Blog Express API with Swagger",
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '30mb',
  })
);
app.use(cors());

Object.keys(routers).map((key) => app.use([key], routers[key]));

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected mongoose!');
    app.listen(PORT, () => {
      console.log(`app listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });
