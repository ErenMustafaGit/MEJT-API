const { isEmpty } = require('lodash');

const {
	getFeedbackSessionsFromUser,
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

module.exports = {
	getFeedbacksByAthleteId,

};