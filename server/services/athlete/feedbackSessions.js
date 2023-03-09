const { isEmpty } = require('lodash');
const {
	createFeedbackSession,
	getFeedbackSessionByUserId,
} = require('../../repositories/feedbackSession.repository');


const createAthleteFeedback = async (userId, sessionId, shape, tiredness, stress, sensation, injury) => {
	const feedbackCreated = await createFeedbackSession(userId, sessionId, shape, tiredness, stress, sensation, injury);

	return feedbackCreated;
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
	createAthleteFeedback, getFeedbackSessionIfProvided, 
};