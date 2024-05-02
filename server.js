const express = require('express');
const { swaggerSpec, swaggerUi } = require('./swagger');
const { request, gql } = require('graphql-request');
const cors = require('cors');
const app = express();
const port = 3001;

// GraphQL endpoint URL
const graphqlEndpoint = 'https://staging.voltron.id/v1/graphql';

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS
app.use(cors());

// GraphQL queries
const { allChargeStationsQuery, chargeStationDetailsQuery } = require('./graphql');

/**
 * @swagger
 * /api/charge-stations:
 *   get:
 *     summary: Retrieve all charge stations
 *     description: Returns a list of all charge stations.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Limit the number of charge stations returned.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Skip the specified number of charge stations.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of charge stations.
 */
app.get('/api/charge-stations', async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const data = await request(graphqlEndpoint, allChargeStationsQuery, {
      limit: limit || 10,
      offset: offset || 0,
    });
    res.json(data.publicChargeStation);
  } catch (error) {
    console.error('Error fetching charge stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/charge-station/{id}:
 *   get:
 *     summary: Retrieve charge station details by ID
 *     description: Returns details of a charge station based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Charge station ID.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Charge station details.
 *       404:
 *         description: Charge station not found.
 */
app.get('/api/charge-station/:id', async (req, res) => {
  const stationId = req.params.id;
  try {
    const data = await request(graphqlEndpoint, chargeStationDetailsQuery, {
      stationId: parseInt(stationId),
    });
    res.json(data.publicChargeStation);
  } catch (error) {
    console.error('Error fetching charge station details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
