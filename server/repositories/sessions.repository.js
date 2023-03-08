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

module.exports = {
	getSessionsByTeamId
};
