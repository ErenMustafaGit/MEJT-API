const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');
const trainerTeamsRoute = require('./routes/trainer/teams');
const athleteTeamsRoute = require('./routes/athlete/teams');
const athleteSessionsRoute = require('./routes/athlete/sessions');
const trainerTeamFeedbacksRoute = require('./routes/trainer/feedbackSessions');
const trainerTeamInformationRoute = require('./routes/trainer/teamInformation');
const userAthleteFeedbacksRoute = require('./routes/user/feedbackSessions');
const athleteFeedbacksRoute = require('./routes/athlete/feedbackSessions');

const allRoutes = [
	authRoute,
	testRoute,
	trainerTeamsRoute,
	athleteTeamsRoute,
	athleteSessionsRoute,
	trainerTeamFeedbacksRoute,
	trainerTeamInformationRoute,
	userAthleteFeedbacksRoute,
	athleteFeedbacksRoute
];

module.exports = allRoutes;
