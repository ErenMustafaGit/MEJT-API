const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');
const trainerTeamsRoute = require('./routes/trainer/teams');
const athleteTeamsRoute = require('./routes/athlete/teams');
const athleteSessionsRoute = require('./routes/athlete/sessions');
const trainerTeamFeedbacksRoute = require('./routes/trainer/feedbackSessions');
const UserAthleteFeedbacksRoute = require('./routes/user/feedbackSessions');
const AthleteCreateFeedbackRoute = require('./routes/athlete/feedbackSessions');

const allRoutes = [
	authRoute,
	testRoute,
	trainerTeamsRoute,
	athleteTeamsRoute,
	athleteSessionsRoute,
	trainerTeamFeedbacksRoute,
	UserAthleteFeedbacksRoute,
	AthleteCreateFeedbackRoute
];

module.exports = allRoutes;
