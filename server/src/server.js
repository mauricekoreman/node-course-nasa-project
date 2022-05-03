const http = require('http');

// We've now seperated all of our express middleware from our server functions.
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();  
  
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
  });
}

startServer();
