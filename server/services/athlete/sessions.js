const {
	getFeedbackSessionsFromUser,
} = require('../../repositories/feedbackSession.repository');
const {
	getSessionsByTeamId,
} = require('../../repositories/sessions.repository');
const { getTeamById } = require('../../repositories/team.repository');

const getSessionsByTeamIdWithFeedbackBoolean = async (athleteId, teamId) => {
	try {
		const sessions = await getSessionsByTeamId(parseInt(teamId));
		const feedbacks = await getFeedbackSessionsFromUser(
			parseInt(athleteId),
			parseInt(teamId)
		);

		const teamInfo = await getTeamById(parseInt(teamId));

		const sessionsFormatted = sessions.map((session) => {
			const isFeedback = (feedback) => feedback.sessionId === session.id;
			const sessionFormatted = { ...session, feedbackProvided: feedbacks.some(isFeedback),teamName: teamInfo.name, sessionId: session.id };
			delete sessionFormatted.id;
			return sessionFormatted;
		});
		return sessionsFormatted;
	} catch (err) {
		return err;
	}
};

module.exports = { getSessionsByTeamIdWithFeedbackBoolean };
