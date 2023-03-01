const express = require('express');
const cors = require('cors');

const allRoutes = require('./server/routes');

const app = express();

const API_PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(allRoutes);

app.listen(API_PORT, () => {
	console.log(`Server is running on ${API_PORT}`);
});