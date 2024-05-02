const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Voltron API with Swagger',
    version: '1.0.0',
    description: 'Documentation for Express API',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
};

// Options for the Swagger JSdoc
const options = {
  swaggerDefinition,
  apis: ['./server.js'], // Path to the API files
};

// Initialize Swagger JSdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };
