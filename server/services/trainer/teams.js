const {
	getAthletes,
	getTeamsByUserId,
	createTeamRepo,
	addAthletes,
} = require('../../repositories/team.repository');

const getAthletesByTeamId = async (teamId) => {
	try {
		const athletes = getAthletes(teamId);
		return athletes;
	} catch (err) {
		return err;
	}
};

const getTeamsByTrainerId = async (trainerId) => {
	const teams = await getTeamsByUserId(trainerId);
	const formattedTeams = Promise.all(
		teams.map(async (team) => {
			const athletes = await getAthletes(team.id);
			const nextSession =
        team.sessions.length === 0
        	? null
        	: { ...team.sessions[0], sessionId: team.sessions[0].id };
			if (nextSession != null) {
				delete nextSession.id;
			}
			const teamsWithAllFields = {
				...team,
				teamId: team.id,
				trainerId,
				athleteNumber: athletes.length,
				sessionNumber: team._count.sessions,
				nextSession,
			};
			// eslint-disable-next-line no-unused-vars
			const { _count, userId, id, sessions, ...teamsFormattedWithGoodFields } =
        teamsWithAllFields;

			return teamsFormattedWithGoodFields;
		})
	);
	return formattedTeams;
};

const createTeam = async (team) => {
	try {
		const newTeam = await createTeamRepo(team.trainerId, team.name);
		let athletesFormatted = [];
		team.athletes
			.forEach((athlete) => {
				athletesFormatted.push(athlete.email);
			});
		const newTeamWithAthletes = await addAthletes(newTeam.id, athletesFormatted);
		return newTeamWithAthletes;
	} catch (err) {
		return err;
	}
};

module.exports = { getAthletesByTeamId, getTeamsByTrainerId, createTeam };
