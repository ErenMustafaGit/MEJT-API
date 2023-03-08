const { isEmpty } = require('lodash');

const {
	getFeedbackSessionsFromUser,
} = require('../../repositories/feedbackSession.repository');

const { 
	getUsersWithLastUpdate,
} = require('../../repositories/user.repository');


const getFeedbacksByTeamId = async (teamId, startingDate, endingDate) => {
	const athletes = await getUsersWithLastUpdate(teamId);
	const formattedUsers = Promise.all(athletes.map(async(athlete) => {
		const feedbacks = await getFeedbackSessionsFromUser(athlete.id, teamId, startingDate, endingDate);
		const lastUpdate = (isEmpty(athlete.feedbacks_session) ? null : athlete.feedbacks_session[0].date); 

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
			userId:athlete.id, 
			email: athlete.email, 
			name: athlete.name, 
			lastUpdate: lastUpdate, 
			sessionsFeedbacks: (isEmpty(formattedFeedbacks) ? null : {...formattedFeedbacks})
		};

		return formattedAthletes;
	}));
	return formattedUsers;
};

module.exports = {
	getFeedbacksByTeamId,

};