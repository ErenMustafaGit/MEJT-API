const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');
const trainerTeamsRoute = require('./routes/trainer/teams');

const allRoutes=[authRoute, testRoute,trainerTeamsRoute];

module.exports = allRoutes;