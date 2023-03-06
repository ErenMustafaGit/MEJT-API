const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');
const trainerTeamsRoute = require('./routes/trainer/teams');
const athleteTeamsRoute = require('./routes/athlete/teams');

const allRoutes = [authRoute, testRoute, trainerTeamsRoute, athleteTeamsRoute];

module.exports = allRoutes;
