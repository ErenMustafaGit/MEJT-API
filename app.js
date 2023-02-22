const express = require('express');
const cors = require('cors');

const app = express();

const API_PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/coucou', (req, res) => {
	console.log('req :>> ', req);
	res.send('Coucou c\'est moi !');
});

app.listen(API_PORT, () => {
	console.log(`Server is running on ${API_PORT}`);
});