// Import express
const express = require('express');

// Import path
const path = require('path');

// Import API routes
const api = require('./routes/notes.js');

// Import clog middleware from week 11 activities
const { clog } = require('./middleware/clog');

// Set port
const PORT = process.env.PORT || 3001;

// App uses an express backend
const app = express();

// Use clog middleware from week 11 activities
app.use(clog);

// Middleware for parsing JSON and urlencoded form data (Important for POST requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Uses the routes from the API router
app.use('/api', api);

//Static folder is called public
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for wildcard
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Listen on the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);