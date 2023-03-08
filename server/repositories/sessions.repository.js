const prisma = require('../../prisma/config');

const getSessionsByTeamId = async (teamId) => {
	try {
		const team = await prisma.sessions.findMany({
			where: {
				teamId,
			},
		});
		return team;
	} catch (err) {
		return err;
	}
};

const createSession = async (session) => {
	try {
		const sessionCreated = await prisma.sessions.create({
			data: {
				teamId: session.teamId,
				date: session.date,
				place: session.place,
				description: session.description,
				name: session.name,
			},
		});
		return sessionCreated;
	} catch (err) {
		return err;
	}
};

module.exports = {
	getSessionsByTeamId,
	createSession,
};
