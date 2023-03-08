const prisma = require('../../prisma/config');

const createTeamRepo = async (userId, name) => {
	try {
		const team = await prisma.teams.create({
			data: {
				name,
				userId,
			},
		});
		return team;
	} catch (err) {
		return err;
	}
};

const addAthlete = async (teamId, userId) => {
	try {
		const team = await prisma.users_team_mapping.create({
			data: {
				teamId,
				userId,
			},
		});
		return team;
	} catch (err) {
		return err;
	}
};

const addAthletes = async (teamId, userIds) => {
	try {
		const team = userIds.map(async (userId) => {
			return await prisma.users_team_mapping.create({
				data: {
					teamId,
					userId,
				},
			});
		});
		return team;
	} catch (err) {
		return err;
	}
};

const getAthletes = async (teamId) => {
	try {
		const athletes = await prisma.users_team_mapping.findMany({
			where: {
				teamId,
			},
			select: {
				id: false,
				teamId: false,
				userId: false,

				users: {
					select: {
						id: true,
						email: true,
						password: false,
						name: true,
						type: true,
					},
				},
			},
		});
		return athletes;
	} catch (err) {
		return err;
	}
};

const getTeamsByUserId = async (trainerId) => {
	try {
		const athletes = await prisma.teams.findMany({
			where: {
				userId: trainerId,
			},
			include: {
				_count: {
					select: {
						sessions: true,
					},
				},
				sessions: {
					where: {
						date: {
							gte: new Date(Date.now()).toISOString(),
						},
					},
					orderBy: {
						date: 'asc',
					},
					select: {
						id: true,
						date: true,
						place: true,
						description: true,
						name: true,
						teamId: false,
					},
				},
			},
		});
		return athletes;
	} catch (err) {
		return err;
	}
};

const getTeamsByAthleteId = async (athleteId) => {
	try {
		const athletes = await prisma.users_team_mapping.findMany({
			where: {
				userId: athleteId,
			},
			select: {
				id: false,
				teamId: true,
				userId: false,

				teams: {
					select: {
						id: false,
						name: true,
						userId: false,
					},
				},
			},
		});
		return athletes;
	} catch (err) {
		return err;
	}
};

module.exports = {
	createTeamRepo,
	addAthlete,
	addAthletes,
	getAthletes,
	getTeamsByUserId,
	getTeamsByAthleteId,
};
