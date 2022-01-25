// Setup empty JS object to act as endpoint for all routes
let projectData =  {};
const port = 8000;

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, listening(port));

function listening(port) {
    console.log('Server is running on port: ' + port);
}

// Routes
// GET Route
app.get('/get', sendProjectData);

function sendProjectData(req, res) {
    console.log('GET request incoming');
    res.send(projectData);
    console.log(projectData);
}

//POST Route
app.post('/post', updateProjectData);

function updateProjectData(req, res) {
    console.log('POST project data request received');
    projectData = req.body;
    console.log(projectData);
}