const { PrismaClient } = require('@prisma/client');
const { now } = require('lodash');
const prisma = new PrismaClient();

const getFeedbackSessionsFromUser = async (userId, teamId, startingDate, endingDate) => {
	try {
		const feedbackSessions = await prisma.feedbacks_session.findMany({
			where: {
				userId,
                teamId,
                date: {
                    lte: endingDate != null ? endingDate : undefined,
                    gte: startingDate != null ? startingDate : undefined,
                }
			},
		});
		return feedbackSessions;
	} catch (err) {
		return err;
	}
};

const getUserWithLastUpdate = async (userId, teamId) => {
	try {
		const feedbackSessions = await prisma.feedbacks_session.findMany({
			where: {
				userId,
                teamId: teamId != null ? teamId : undefined,
			},
			select: {
				users: {
					select: {
						id: true,
						email: true,
						password: false,
						name: true,
						type: true
					}
				},
                id:        false,
                shape:     false,
                tiredness: false,
                stress:    false,
                sensation: false,
                injury:    false,
                userId:    false,
                sessionId: false,
                date:      true,
            },
            take: 1,
            orderBy: {
                date: 'desc',
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

module.exports = {
	getFeedbackSessionsFromUser, getUserWithLastUpdate, createFeedbackSession,
};