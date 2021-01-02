const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionsRouter = require('./routes/promotionsRouter');
const partnersRouter = require('./routes/partnersRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

//provides root path for campsite router. Don't have to specify that in campsiteRouter.js
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionsRouter);
app.use('/partners', partnersRouter);

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
