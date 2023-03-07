const { getTeamsByAthleteId } = require('../../repositories/team.repository');

const getTeamsFormattedByAthleteId = async (athleteId) => {
	try {
		const teams = await getTeamsByAthleteId(athleteId);
		const formattedTeams = await Promise.all(
			teams.map(async (team) => {
				const name = team?.teams?.name;
				const teamWithGoodFields = {...team,name};
				delete teamWithGoodFields.teams;
				return teamWithGoodFields;
			})
		);
		return formattedTeams;
	} catch (err) {
		return err;
	}
};

module.exports = { getTeamsFormattedByAthleteId };
