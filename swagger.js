const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API to manage tasks with MongoDB, Express, and Node.js',
    },
    servers: [
      {
        url: 'https://tu-app.onrender.com', // Cambia esta URL por la tuya de Render
      },
      {
        url: 'http://localhost:3000', // Útil para desarrollo local
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde estarán tus comentarios Swagger en las rutas
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
}

module.exports = swaggerDocs;
