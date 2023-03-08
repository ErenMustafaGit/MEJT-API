const {
	getFeedbackSessionsFromUser,
} = require('../../repositories/feedbackSession.repository');
const {
	getSessionsByTeamId,
} = require('../../repositories/sessions.repository');

const getSessionsByTeamIdWithFeedbackBoolean = async (athleteId, teamId) => {
	try {
		const sessions = await getSessionsByTeamId(parseInt(teamId));
		const feedbacks = await getFeedbackSessionsFromUser(
			parseInt(athleteId),
			parseInt(teamId)
		);
		const sessionsFormatted = sessions.map((session) => {
			const isFeedback = (feedback) => feedback.sessionId === session.id;
			const sessionFormatted = { ...session, feedbackProvided: feedbacks.some(isFeedback),teamName: session.name, sessionId: session.id };
			delete sessionFormatted.name;
			delete sessionFormatted.id;
			return sessionFormatted;
		});
		return sessionsFormatted;
	} catch (err) {
		return err;
	}
};

module.exports = { getSessionsByTeamIdWithFeedbackBoolean };
