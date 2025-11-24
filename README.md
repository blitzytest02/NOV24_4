 # NOV24_4 - Node.js Express Server Tutorial

A simple Node.js server using Express.js framework with two greeting endpoints.

## Features

- **Hello World Endpoint**: Returns "Hello world" message
- **Evening Greeting Endpoint**: Returns "Good evening" message
- Production-ready error handling
- Request logging
- Graceful shutdown support
- Comprehensive test coverage

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Server

### Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

### Custom port:

```bash
PORT=8080 npm start
```

## Available Endpoints

### GET /
Returns API information and available endpoints

**Response:**
```json
{
  "message": "Node.js Express Server Tutorial",
  "endpoints": {
    "hello": {
      "method": "GET",
      "path": "/hello",
      "description": "Returns \"Hello world\""
    },
    "evening": {
      "method": "GET",
      "path": "/evening",
      "description": "Returns \"Good evening\""
    }
  }
}
```

### GET /hello
Returns a "Hello world" greeting

**Response:**
```
Hello world
```

**Example:**
```bash
curl http://localhost:3000/hello
```

### GET /evening
Returns a "Good evening" greeting

**Response:**
```
Good evening
```

**Example:**
```bash
curl http://localhost:3000/evening
```

## Running Tests

### Run all tests:

```bash
npm test
```

### Run tests with coverage:

```bash
npm run test:coverage
```

### Run tests in watch mode (during development):

```bash
npm run test:watch
```

## Test Coverage

The project maintains comprehensive test coverage:
- Unit tests for all endpoints
- Integration tests for HTTP responses
- Error handling tests
- 404 handling tests

Target coverage: 100% for all endpoints

## Project Structure

```
nov24_4/
├── src/
│   └── server.js          # Main Express server application
├── tests/
│   └── server.test.js     # Test suite for server endpoints
├── package.json           # Project dependencies and scripts
├── jest.config.js         # Jest testing configuration
├── .gitignore            # Git ignore patterns
└── README.md             # This file
```

## Configuration

The server can be configured using environment variables:

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment mode (development/production)

## Error Handling

The server includes comprehensive error handling:
- Try-catch blocks in all route handlers
- Global error handler middleware
- 404 handler for undefined routes
- Graceful shutdown on SIGTERM and SIGINT signals

## Development

The server includes request logging middleware that logs all incoming requests with timestamps for debugging and monitoring purposes.

## License

ISC

