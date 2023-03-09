const { isEmpty } = require('lodash');

const {
	getFeedbackSessionsFromUser,
    getFeedbackSessionByUserId,
} = require('../../repositories/feedbackSession.repository');

const { 
	getUsersWithLastUpdate,
} = require('../../repositories/user.repository');


const getFeedbacksByAthleteId = async (athleteId, teamId, startingDate, endingDate) => {
	const athlete = await getUsersWithLastUpdate(teamId, athleteId);
	const feedbacks = await getFeedbackSessionsFromUser(athleteId, teamId, startingDate, endingDate);
	const lastUpdate = (isEmpty(athlete[0].feedbacks_session) ? null : athlete[0].feedbacks_session[0].date); 

	var formattedFeedbacks = [];

	feedbacks.forEach(feedback => {
		formattedFeedbacks.push({ 
			sessionId: feedback.sessionId,
			name: feedback.sessions.name,
			shape: feedback.shape, 
			tiredness: feedback.tiredness, 
			stress: feedback.stress, 
			sensation: feedback.sensation, 
			injury: feedback.injury, 
			date: feedback.date, 
		});
	});

	const formattedAthletes = { 
		userId:athleteId, 
		email: athlete[0].email, 
		name: athlete[0].name, 
		lastUpdate: lastUpdate, 
		sessionsFeedbacks: [...formattedFeedbacks],
	};

	return formattedAthletes;
};

const getFeedbackSessionIfProvided = async (userId, sessionId) => {
    const feedbackProvided = await getFeedbackSessionByUserId(userId, sessionId);

	if(isEmpty(feedbackProvided))
	{
		return null;
	}
	else
	{
		const formattedFeedbackProvided = { 
			sessionId: feedbackProvided[0].sessionId, 
			name: feedbackProvided[0].sessions.name, 
			shape: feedbackProvided[0].shape,
			tiredness: feedbackProvided[0].tiredness,
			stress: feedbackProvided[0].stress,
			sensation: feedbackProvided[0].sensation,
			injury: feedbackProvided[0].injury,
			date: feedbackProvided[0].date
		};
		return formattedFeedbackProvided;
	}
};

module.exports = {
	getFeedbacksByAthleteId, 
    getFeedbackSessionIfProvided,
};