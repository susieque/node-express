const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

//routing method that's catch-all for all http verbs. Set defaults for all the routing methods for this path.
//Takes path for first parameter '/campsites' Second parameter callback function req, res, next. In call back response statusCode 200.
//A header of Content-Type, text/plain to send back plain text in response body.
//Then next function to pass control of application routing to next routing method after this one. Or it stops here and not go any further.
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

//Next routing method with endpoint got get request. Not doing more routing methods after this one, not passing the next function in this callback.
//Headers been set by app.all so res.end method to send message body to client.
app.get('/campsites', (req, res) => {
	res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
	res.end(`Will add the campsites: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

//This allows to store whatever client sends as part of path after / as route parameter named campsiteId. Use same path for all 4 methods.
app.get('/campsites/:campsiteId', (req, res) => {
	res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post ('/campsites/:campsiteId', (req, res) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

//\n for new line. This sends as json formatted body of request message, echoing back response as text.
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

//delete specific campsite, not all of them.
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//serve static files from public folder
app.use(express.static(__dirname + '/public'));

//middleware function - access to 3 parameters (req is request object, res is response object, and a function called next (we won't use next here).
app.use((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
//create an instance of the http server class and start listening to it. 
app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
