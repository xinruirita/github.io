//API GET: http://localhost:13001/soils
//API POST: http://localhost:13001/api/soils

// include any libraries
const express = require('express');  // include the express library 
// declare any global variables:
const server = express();			       // create a named server using express  
const bodyParser = require('body-parser');
server.use(bodyParser.json());

let soils = [
	{ id: 1, Location: "SW Entrance", pH: 9.0, metal_content: { Pb: 230, Cu: 187, As: 34, Zu: 131 }},
	{ id: 2, Location: "NE Entrance", pH: 8.0, metal_content: { Pb: 141, Cu: 146, As: 27, Zu: 136 }},
	{ id: 3, Location: "SE Entrance", pH: 10.0, metal_content: { Pb: 534, Cu: 249, As: 62, Zu: 268 }},
]

// define what to do when the client requests something:
// Define a route for HTTP GET requests to the root URL ('/')
server.get('/', (req, res) => {
	console.log("got a request");
	// respond to the client
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write("hello");
	res.end();
});

// Define a route for HTTP GET requests to ('/api/soils')
// this route returns the list of products in JSON format
server.get('/api/soils', (req, res) => {
	res.json(soils); // send an array as a JSON response
});

server.post('/soils', (req, res) => {

	//create qa JSON object from the request body
	const { Location, pH, metal_content } = req.body;
	const newItem = { id: soils.length + 1, Location, pH, metal_content };

	//add it to the array
	soils.push(newItem);

	//201 indicates sucessful POST
	res.status(201).json(newItem);

});

// Start the server on port 13001 and log a message to the console
server.listen(13001, () => console.log("server running on port 13001"));
