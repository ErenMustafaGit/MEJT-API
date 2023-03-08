const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');
const trainerTeamsRoute = require('./routes/trainer/teams');
const athleteTeamsRoute = require('./routes/athlete/teams');
const trainerTeamFeedbacksRoute = require('./routes/trainer/feedbackSessions');
const UserAthleteFeedbacksRoute = require('./routes/user/feedbackSessions');

const allRoutes = [
	authRoute,
	testRoute,
	trainerTeamsRoute,
	athleteTeamsRoute,
	trainerTeamFeedbacksRoute,
	UserAthleteFeedbacksRoute,
];

module.exports = allRoutes;
