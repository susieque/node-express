const express = require('express');
const campsiteRouter = express.Router();

//In the route method give a single arguement of a path '/' set up campsite path in server.js
//Single statement handles all the endpoints for routing to campsites.
campsiteRouter
	.route('/')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the campsites to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the campsite: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /campsites');
	})
	.delete((req, res) => {
		res.end('Deleting all campsites');
	});

campsiteRouter
	.route('/:campsiteId')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'plain/text');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the campsites to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the campsite: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /campsites');
	})
	.delete((req, res) => {
		res.end('Deleting all campsites');
	});

module.exports = campsiteRouter;
