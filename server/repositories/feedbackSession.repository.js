const { PrismaClient } = require('@prisma/client');
const { now } = require('lodash');
const prisma = new PrismaClient();

const getFeedbackSessionsFromUser = async (userId, teamId, startingDate, endingDate) => {
	try {
		const feedbackSessions = await prisma.feedbacks_session.findMany({
			where: {
				userId,
                date: {
                    lte: endingDate != null ? endingDate : undefined,
                    gte: startingDate != null ? startingDate : undefined,
                },
				sessions: {
					is:
					{
						teamId,
					}
				},
			},
			select: {
				id: true,
				shape: true,
				tiredness: true,
				stress:true,
				sensation:true,
				injury:true,
				date:true,
				userId:true,
				sessionId:true,
				sessions: {
					select:{
						name:true,
					}
				}
			}
		});
		return feedbackSessions;
	} catch (err) {
		return err;
	}
};

const createFeedbackSession = async (userId, sessionId, shape, tiredness, stress, sensation, injury) => {
	try {
		const feedbacks_session = await prisma.feedbacks_session.create({
			data: {
                shape,
				tiredness, 
                stress,
                sensation,
                injury: injury != null ? injury : undefined,
                date: new Date(now()),
                userId,
                sessionId,
			},
		});
		return feedbacks_session;
	} catch (err) {
		return err;
	}
};

getFeedbackSessionsFromUser(3, 1).then(result => {
    console.log(result);
});

module.exports = {
	getFeedbackSessionsFromUser, createFeedbackSession,
};