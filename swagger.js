const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
	'./server/routes/auth.js',
	'./server/routes/athlete/sessions.js',
	'./server/routes/athlete/feedbackSessions.js',
	'./server/routes/athlete/teams.js',
	'./server/routes/trainer/feedbackSessions.js',
	'./server/routes/trainer/sessions.js',
	'./server/routes/trainer/teamInformation.js',
	'./server/routes/trainer/teams.js',
	'./server/routes/user/feedbackSessions.js',
];

swaggerAutogen(outputFile, endpointsFiles);
