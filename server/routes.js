const authRoute = require('./routes/auth');
const trainerTeamsRoute = require('./routes/trainer/teams');
const athleteTeamsRoute = require('./routes/athlete/teams');
const athleteSessionsRoute = require('./routes/athlete/sessions');
const trainerSessionsRoute = require('./routes/trainer/sessions');
const trainerTeamFeedbacksRoute = require('./routes/trainer/feedbackSessions');
const trainerTeamInformationRoute = require('./routes/trainer/teamInformation');
const userAthleteFeedbacksRoute = require('./routes/user/feedbackSessions');
const athleteFeedbacksRoute = require('./routes/athlete/feedbackSessions');

const allRoutes = [
	authRoute,
	trainerTeamsRoute,
	athleteTeamsRoute,
	athleteSessionsRoute,
	trainerSessionsRoute,
	trainerTeamFeedbacksRoute,
	trainerTeamInformationRoute,
	userAthleteFeedbacksRoute,
	athleteFeedbacksRoute
];

module.exports = allRoutes;
