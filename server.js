const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();
//middleware function - access to 3 parameters (req is request object, res is response object, and a function called next (we won't use next here).
app.use((req, res) => {
	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
//create an instance of the http server class and start listening to it. 
app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

