const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTeam = async (userId, name) => {
	try {
		const team = await prisma.teams.create({
			data: {
                name,
				userId
			},
		});
		return team;
	} catch (err) {
		return err;
	}
};

const addAthlete = async (teamId, userId) => {
	try {
		const userFormatted = parseInt(userId);
		const teamFormatted = parseInt(teamId);

		const team = await prisma.users_team_mapping.create({
			data: {
                teamId,
				userId
			},
		});
		return team;
	} catch (err) {
		return err;
	}
};

addAthlete('3', '3').then(result => {
    console.log(result);
});




module.exports = {
	createTeam, addAthlete, getAthlete,
};
