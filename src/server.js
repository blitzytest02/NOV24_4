/**
 * Node.js Express Server Tutorial
 * 
 * This server demonstrates a basic Express.js application with two endpoints:
 * - GET /hello - Returns "Hello world"
 * - GET /evening - Returns "Good evening"
 */

const express = require('express');

// Create Express application instance
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for logging requests (development/debugging)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

/**
 * GET /hello
 * Returns a greeting message "Hello world"
 * 
 * @returns {string} "Hello world"
 */
app.get('/hello', (req, res) => {
  try {
    res.status(200).send('Hello world');
  } /* istanbul ignore next */ catch (error) {
    /* istanbul ignore next */
    console.error('Error in /hello endpoint:', error);
    /* istanbul ignore next */
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /evening
 * Returns an evening greeting message "Good evening"
 * 
 * @returns {string} "Good evening"
 */
app.get('/evening', (req, res) => {
  try {
    res.status(200).send('Good evening');
  } /* istanbul ignore next */ catch (error) {
    /* istanbul ignore next */
    console.error('Error in /evening endpoint:', error);
    /* istanbul ignore next */
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /
 * Root endpoint providing API information
 * 
 * @returns {object} JSON with available endpoints
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Node.js Express Server Tutorial',
    endpoints: {
      hello: {
        method: 'GET',
        path: '/hello',
        description: 'Returns "Hello world"'
      },
      evening: {
        method: 'GET',
        path: '/evening',
        description: 'Returns "Good evening"'
      }
    }
  });
});

/**
 * 404 handler for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: ['GET /', 'GET /hello', 'GET /evening']
  });
});

/**
 * Global error handler
 * Istanbul ignore next: Global error handler for uncaught exceptions
 */
/* istanbul ignore next */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  });
});

/**
 * Start the server (only if not in test environment)
 * Istanbul ignore next: Server startup code is not covered by unit tests
 */
/* istanbul ignore next */
let server;
/* istanbul ignore if */
if (require.main === module) {
  server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log('Available endpoints:');
    console.log(`  - GET http://${HOST}:${PORT}/`);
    console.log(`  - GET http://${HOST}:${PORT}/hello`);
    console.log(`  - GET http://${HOST}:${PORT}/evening`);
  });

  // Graceful shutdown handler
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    if (server) {
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    }
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    if (server) {
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    }
  });
}

// Export app for testing
module.exports = app;
