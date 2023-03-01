const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTeam = async (userId, name) => {
	try {
		const typeFormatted = parseInt(userId);
		const team = await prisma.teams.create({
			data: {
                name,
				userId:typeFormatted
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

		const team = await prisma.usersTeamMapping.create({
			data: {
                teamId:teamFormatted,
				userId:userFormatted
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
	createTeam,
};