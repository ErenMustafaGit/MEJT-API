const {
	getAthletes,
	getTeamsByUserId,
	createTeamRepo,
	addAthletes,
} = require('../../repositories/team.repository');
const { getUserByEmail } = require('../../repositories/user.repository');

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
	const newTeam = await createTeamRepo(team.trainerId, team.name);
	let athletesFormatted = [];
	team.athletes.forEach(async (athlete) => {
		const user = await getUserByEmail(athlete.email);
		athletesFormatted.push(user.id);
	});
	const athleteIds = athletesFormatted.map((athlete) => athlete.userId);
	const newTeamWithAthletes = await addAthletes(newTeam.id, athleteIds);
	return newTeamWithAthletes;
};

module.exports = { getAthletesByTeamId, getTeamsByTrainerId, createTeam };
