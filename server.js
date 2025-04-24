const http = require('http');
const fs = require('fs');
const path = require('path');
const fileHandler = require('./fileHandler');

// Initialize data files when server starts
fileHandler.initializeDataFiles();

// Set up the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Function to read request body
const readRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    const bodyParts = [];
    req.on('data', (chunk) => {
      bodyParts.push(chunk);
    });
    req.on('end', () => {
      if (bodyParts.length) {
        const body = Buffer.concat(bodyParts).toString();
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      } else {
        resolve({});
      }
    });
    req.on('error', reject);
  });
};

// Create the server
const server = http.createServer(async (req, res) => {
  // Parse the URL and method
  const url = req.url;
  const method = req.method;
  
  try {
    // Match path pattern to extract ID if present
    const idPattern = /^\/(movies|series|songs)\/(\d+)$/;
    const idMatch = url.match(idPattern);
    
    // Root path - serve documentation
    if (url === '/' || url === '/index.html') {
      fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Internal server error' }));
          return;
        }
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
      });
      return;
    }
    
    // Handle the movies endpoint
    else if (url === '/movies') {
      // GET - Read all movies
      if (method === 'GET') {
        const movies = fileHandler.getAllItems('movies');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ movies }));
      } 
      // POST - Create a new movie
      else if (method === 'POST') {
        const body = await readRequestBody(req);
        const movies = fileHandler.addItem('movies', body);
        
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Movie added", movies }));
      } else {
        res.statusCode = 405; // Method Not Allowed
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    // Handle the movies/:id endpoint
    else if (idMatch && idMatch[1] === 'movies') {
      const id = parseInt(idMatch[2]);
      
      // PUT - Update a movie
      if (method === 'PUT') {
        const body = await readRequestBody(req);
        const movies = fileHandler.updateItem('movies', id, body);
        
        if (movies) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Movie updated", movies }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Movie not found" }));
        }
      } 
      // DELETE - Remove a movie
      else if (method === 'DELETE') {
        const movies = fileHandler.deleteItem('movies', id);
        
        if (movies) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Movie deleted", movies }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Movie not found" }));
        }
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    
    // Handle the series endpoint
    else if (url === '/series') {
      // GET - Read all series
      if (method === 'GET') {
        const series = fileHandler.getAllItems('series');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ series }));
      } 
      // POST - Create a new series
      else if (method === 'POST') {
        const body = await readRequestBody(req);
        const series = fileHandler.addItem('series', body);
        
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Series added", series }));
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    // Handle the series/:id endpoint
    else if (idMatch && idMatch[1] === 'series') {
      const id = parseInt(idMatch[2]);
      
      // PUT - Update a series
      if (method === 'PUT') {
        const body = await readRequestBody(req);
        const series = fileHandler.updateItem('series', id, body);
        
        if (series) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Series updated", series }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Series not found" }));
        }
      } 
      // DELETE - Remove a series
      else if (method === 'DELETE') {
        const series = fileHandler.deleteItem('series', id);
        
        if (series) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Series deleted", series }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Series not found" }));
        }
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    
    // Handle the songs endpoint
    else if (url === '/songs') {
      // GET - Read all songs
      if (method === 'GET') {
        const songs = fileHandler.getAllItems('songs');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ songs }));
      } 
      // POST - Create a new song
      else if (method === 'POST') {
        const body = await readRequestBody(req);
        const songs = fileHandler.addItem('songs', body);
        
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Song added", songs }));
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    // Handle the songs/:id endpoint
    else if (idMatch && idMatch[1] === 'songs') {
      const id = parseInt(idMatch[2]);
      
      // PUT - Update a song
      if (method === 'PUT') {
        const body = await readRequestBody(req);
        const songs = fileHandler.updateItem('songs', id, body);
        
        if (songs) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Song updated", songs }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Song not found" }));
        }
      } 
      // DELETE - Remove a song
      else if (method === 'DELETE') {
        const songs = fileHandler.deleteItem('songs', id);
        
        if (songs) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Song deleted", songs }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: "Song not found" }));
        }
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Method not allowed" }));
      }
    }
    
    // Handle 404 for any other endpoints
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: "Endpoint not found" }));
    }
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});