const {
	createFeedbackSession,
} = require('../../repositories/feedbackSession.repository');


const createAthleteFeedback = async (userId, sessionId, shape, tiredness, stress, sensation, injury) => {
	const feedbackCreated = await createFeedbackSession(userId, sessionId, shape, tiredness, stress, sensation, injury);

	return feedbackCreated;
};

module.exports = {
	createAthleteFeedback, 
};