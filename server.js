const http = require('http');

// Create data
const movies = [
    { id: 1, title: "Sicario", year: 2015, director: "Denis Villeneuve", genre: "Crime" },
    { id: 2, title: "Arrival", year: 2016, director: "Denis Villeneuve", genre: "Sci-Fi" },
    { id: 3, title: "Gattaca", year: 1997, director: "Andrew Niccol", genre: "Sci-Fi" },
    { id: 4, title: "Sky Blue", year: 2003, director: "Moon-saeng Kim", genre: "Animation" },
    { id: 5, title: "The Matrix", year: 1999, director: "Wachowski Sisters", genre: "Sci-Fi" }
];

const series = [
    { id: 1, title: "Black Mirror", seasons: 6, creator: "Charlie Brooker", genre: "Sci-Fi" },
    { id: 2, title: "Billions", seasons: 7, creator: "Brian Koppelman, David Levien, Andrew Ross Sorkin", genre: "Drama" },
    { id: 3, title: "Succession", seasons: 4, creator: "Jesse Armstrong", genre: "Drama" },
    { id: 4, title: "Vikings", seasons: 6, creator: "Michael Hirst", genre: "Historical Drama" },
    { id: 5, title: "Silo", seasons: 1, creator: "Graham Yost", genre: "Sci-Fi" }
];

const songs = [
    { id: 1, title: "Jerusalema", artist: "Master KG ft. Nomcebo Zikode", year: 2019, genre: "House" },
    { id: 2, title: "Drive", artist: "Black Coffee & David Guetta ft. Delilah Montagu", year: 2018, genre: "House" },
    { id: 3, title: "Banomoya", artist: "Prince Kaybee ft. Busiswa & TNS", year: 2018, genre: "House" },
    { id: 4, title: "You Need Me", artist: "Black Coffee ft Sun El Musician, Maxine Ashley ", year: 2021, genre: "House" },
    { id: 5, title: "Umlilo", artist: "DJ Zinhle ft. Mvzzle & Rethabile", year: 2019, genre: "House" }
];

// Set up the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Handle the movies endpoint
  if (url === '/movies') {

    if (method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ movies: movies }));
    } 

    else if (method === 'POST') {

      const newMovie = { id: movies.length + 1, title: "Sicario: Day of the Soldado", year: 2018, director: "Stefano Sollima", genre: "Crime" };
      movies.push(newMovie);
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: "Movie added", movies: movies }));
    } 
    // PUT - Update a movie
    else if (method === 'PUT') {

      if (movies.length > 0) {
        movies[0].title = "Updated Movie Title";
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Movie updated", movies: movies }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No movies to update" }));
      }
    } 
    // DELETE - Remove a movie
    else if (method === 'DELETE') {

      if (movies.length > 0) {
        movies.splice(0, 1);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Movie deleted", movies: movies }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No movies to delete" }));
      }
    }
  } 
  // Handle the series endpoint
  else if (url === '/series') {
    // GET - Read all series
    if (method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ series: series }));
    } 
    // POST - Create a new series
    else if (method === 'POST') {
    const newSeries = { id: series.length + 1, title: "Suits", seasons: 9, creator: "Aaron Korsh", genre: "Legal Drama" };
      series.push(newSeries);
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: "Series added", series: series }));
    } 
    // PUT - Update a series
    else if (method === 'PUT') {
      if (series.length > 0) {
        series[0].title = "Updated Series Title";
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Series updated", series: series }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No series to update" }));
      }
    } 
    // DELETE - Remove a series
    else if (method === 'DELETE') {
      if (series.length > 0) {
        series.splice(0, 1);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Series deleted", series: series }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No series to delete" }));
      }
    }
  } 
  // Handle the songs endpoint
  else if (url === '/songs') {
    // GET - Read all songs
    if (method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ songs: songs }));
    } 
    // POST - Create a new song
    else if (method === 'POST') {
    const newSong = { id: songs.length + 1, title: "Masithokoze", artist: "Dj Stokie Masithokoze", year: 2024, genre: "House" };
      songs.push(newSong);
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: "Song added", songs: songs }));
    } 
    // PUT - Update a song
    else if (method === 'PUT') {
      if (songs.length > 0) {
        songs[0].title = "Updated Song Title";
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Song updated", songs: songs }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No songs to update" }));
      }
    } 
    // DELETE - Remove a song
    else if (method === 'DELETE') {
      if (songs.length > 0) {
        songs.splice(0, 1);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "Song deleted", songs: songs }));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: "No songs to delete" }));
      }
    }
  } 
  // Handle 404 for any other endpoints
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});