/**
 * Server Tests
 * 
 * Comprehensive test suite for Express server endpoints
 * Testing both required endpoints: /hello and /evening
 */

const request = require('supertest');
const app = require('../src/server');

describe('Express Server Tests', () => {
  
  describe('GET /hello endpoint', () => {
    
    test('should return "Hello world" with status 200', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });

    test('should return text content type', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/text/);
    });

    test('should handle multiple requests correctly', async () => {
      const response1 = await request(app).get('/hello');
      const response2 = await request(app).get('/hello');
      const response3 = await request(app).get('/hello');
      
      expect(response1.status).toBe(200);
      expect(response1.text).toBe('Hello world');
      expect(response2.status).toBe(200);
      expect(response2.text).toBe('Hello world');
      expect(response3.status).toBe(200);
      expect(response3.text).toBe('Hello world');
    });
  });

  describe('GET /evening endpoint', () => {
    
    test('should return "Good evening" with status 200', async () => {
      const response = await request(app).get('/evening');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Good evening');
    });

    test('should return text content type', async () => {
      const response = await request(app).get('/evening');
      
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/text/);
    });

    test('should handle multiple requests correctly', async () => {
      const response1 = await request(app).get('/evening');
      const response2 = await request(app).get('/evening');
      const response3 = await request(app).get('/evening');
      
      expect(response1.status).toBe(200);
      expect(response1.text).toBe('Good evening');
      expect(response2.status).toBe(200);
      expect(response2.text).toBe('Good evening');
      expect(response3.status).toBe(200);
      expect(response3.text).toBe('Good evening');
    });
  });

  describe('GET / (root) endpoint', () => {
    
    test('should return API information with status 200', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
    });

    test('should return correct API structure', async () => {
      const response = await request(app).get('/');
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.message).toBe('Node.js Express Server Tutorial');
    });

    test('should include hello endpoint information', async () => {
      const response = await request(app).get('/');
      
      expect(response.body.endpoints).toHaveProperty('hello');
      expect(response.body.endpoints.hello.method).toBe('GET');
      expect(response.body.endpoints.hello.path).toBe('/hello');
      expect(response.body.endpoints.hello.description).toBe('Returns "Hello world"');
    });

    test('should include evening endpoint information', async () => {
      const response = await request(app).get('/');
      
      expect(response.body.endpoints).toHaveProperty('evening');
      expect(response.body.endpoints.evening.method).toBe('GET');
      expect(response.body.endpoints.evening.path).toBe('/evening');
      expect(response.body.endpoints.evening.description).toBe('Returns "Good evening"');
    });
  });

  describe('404 Not Found handler', () => {
    
    test('should return 404 for undefined GET routes', async () => {
      const response = await request(app).get('/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.type).toBe('application/json');
    });

    test('should return proper error message for undefined routes', async () => {
      const response = await request(app).get('/undefined-route');
      
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toContain('GET');
      expect(response.body.message).toContain('/undefined-route');
    });

    test('should return 404 for undefined POST routes', async () => {
      const response = await request(app).post('/hello');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });

    test('should return 404 for undefined PUT routes', async () => {
      const response = await request(app).put('/evening');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });

    test('should return 404 for undefined DELETE routes', async () => {
      const response = await request(app).delete('/hello');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });

    test('should include available endpoints in 404 response', async () => {
      const response = await request(app).get('/wrong-path');
      
      expect(response.body).toHaveProperty('availableEndpoints');
      expect(response.body.availableEndpoints).toBeInstanceOf(Array);
      expect(response.body.availableEndpoints).toContain('GET /');
      expect(response.body.availableEndpoints).toContain('GET /hello');
      expect(response.body.availableEndpoints).toContain('GET /evening');
    });
  });

  describe('HTTP Methods Support', () => {
    
    test('GET /hello should only support GET method', async () => {
      const getResponse = await request(app).get('/hello');
      expect(getResponse.status).toBe(200);
      
      const postResponse = await request(app).post('/hello');
      expect(postResponse.status).toBe(404);
    });

    test('GET /evening should only support GET method', async () => {
      const getResponse = await request(app).get('/evening');
      expect(getResponse.status).toBe(200);
      
      const postResponse = await request(app).post('/evening');
      expect(postResponse.status).toBe(404);
    });
  });

  describe('Edge Cases', () => {
    
    test('should handle requests with query parameters on /hello', async () => {
      const response = await request(app).get('/hello?param=value');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });

    test('should handle requests with query parameters on /evening', async () => {
      const response = await request(app).get('/evening?test=123');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Good evening');
    });

    test('should handle requests with trailing slashes', async () => {
      const response = await request(app).get('/hello/');
      
      // Express by default normalizes paths and may treat /hello and /hello/ as equivalent
      // Testing actual behavior
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.text).toBe('Hello world');
      }
    });

    test('should handle uppercase route requests', async () => {
      const response = await request(app).get('/HELLO');
      
      // Testing actual Express behavior for case sensitivity
      // Express default behavior may vary based on configuration
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Concurrent Requests', () => {
    
    test('should handle concurrent requests to /hello', async () => {
      const requests = Array(10).fill(null).map(() => 
        request(app).get('/hello')
      );
      
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello world');
      });
    });

    test('should handle concurrent requests to /evening', async () => {
      const requests = Array(10).fill(null).map(() => 
        request(app).get('/evening')
      );
      
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe('Good evening');
      });
    });

    test('should handle concurrent requests to different endpoints', async () => {
      const requests = [
        ...Array(5).fill(null).map(() => request(app).get('/hello')),
        ...Array(5).fill(null).map(() => request(app).get('/evening')),
        ...Array(5).fill(null).map(() => request(app).get('/'))
      ];
      
      const responses = await Promise.all(requests);
      
      expect(responses).toHaveLength(15);
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });

  describe('Response Headers', () => {
    
    test('should include standard Express headers in /hello response', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.headers).toHaveProperty('content-type');
      expect(response.headers).toHaveProperty('content-length');
    });

    test('should include standard Express headers in /evening response', async () => {
      const response = await request(app).get('/evening');
      
      expect(response.headers).toHaveProperty('content-type');
      expect(response.headers).toHaveProperty('content-length');
    });
  });

  describe('Error Handling', () => {
    
    test('should handle malformed requests gracefully', async () => {
      // Send request with invalid headers
      const response = await request(app)
        .get('/hello')
        .set('Content-Type', 'application/json');
      
      // Should still return successful response
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });

    test('should handle requests with large payloads', async () => {
      const largePayload = { data: 'x'.repeat(1000) };
      
      const response = await request(app)
        .post('/hello')
        .send(largePayload);
      
      // POST is not allowed, should return 404
      expect(response.status).toBe(404);
    });

    test('should handle requests with special characters in URLs', async () => {
      const response = await request(app).get('/hello%20world');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });

    test('should handle multiple simultaneous error conditions', async () => {
      const responses = await Promise.all([
        request(app).get('/nonexistent1'),
        request(app).get('/nonexistent2'),
        request(app).get('/nonexistent3'),
        request(app).post('/hello'),
        request(app).delete('/evening')
      ]);
      
      responses.forEach(response => {
        expect(response.status).toBe(404);
      });
    });
  });

  describe('Server Stability', () => {
    
    test('should maintain state across multiple requests', async () => {
      // Make several requests in sequence
      const response1 = await request(app).get('/hello');
      const response2 = await request(app).get('/evening');
      const response3 = await request(app).get('/');
      const response4 = await request(app).get('/hello');
      
      // All should return correct responses
      expect(response1.status).toBe(200);
      expect(response1.text).toBe('Hello world');
      expect(response2.status).toBe(200);
      expect(response2.text).toBe('Good evening');
      expect(response3.status).toBe(200);
      expect(response3.body.message).toBe('Node.js Express Server Tutorial');
      expect(response4.status).toBe(200);
      expect(response4.text).toBe('Hello world');
    });

    test('should handle rapid sequential requests', async () => {
      const responses = [];
      
      for (let i = 0; i < 20; i++) {
        const response = await request(app).get('/hello');
        responses.push(response);
      }
      
      expect(responses).toHaveLength(20);
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello world');
      });
    });
  });
});
