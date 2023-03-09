const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getUserById } = require('../../repositories/user.repository');
const { 
	createAthleteFeedback,
} = require('../../services/athlete/feedbackSessions');
const { getSessionsByTeamIdWithFeedbackBoolean } = require('../../services/athlete/sessions');
const { getTeamsFormattedByAthleteId } = require('../../services/athlete/teams');

require('../../middlewares/auth');

router.post('/athlete/feedbackSession/create', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);

			if (userLogged.type != 1) {
				return res.json({
					success: false,
					error: 'You are not authorized to enter feedbacks',
				});
			}

			const sessionId = parseInt(req.body.sessionId);
			const shape = parseInt(req.body.shape);
			const tiredness = parseInt(req.body.tiredness);
			const stress = parseInt(req.body.stress);
			const sensation = req.body.sensation;
			const injury = req.body.injury;

			try {
				await createAthleteFeedback(
					user.id,
					sessionId,
					shape,
					tiredness,
					stress,
					sensation,
					injury
				);
			} catch (err) {
				return { success: false, erreur: err };
			}

			const formattedFeedbackCreated = { success: true, sessionId: sessionId };

			return res.send(formattedFeedbackCreated);
		}
	})(req, res, next);
});


router.get('/athlete/feedbackSession/notProvided', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);

			if (userLogged.type != 1) {
				return res.json({
					success: false,
					error: 'You are not authorized to get feedbacks',
				});
			}
			const teamsOfAthlete = await getTeamsFormattedByAthleteId(user.id);

			let sessionsWithoutFeedback = [];

			await Promise.all(
				teamsOfAthlete.map(async (team) => {
					const sessions = await getSessionsByTeamIdWithFeedbackBoolean(
						user.id,
						team.teamId
					);
					sessions.forEach((session)=> session.feedbackProvided ? null : sessionsWithoutFeedback.push(session)); 
					return { ...team, sessions };
				})
			);

			sessionsWithoutFeedback.map((session) => delete session.feedbackProvided);

			return res.send({ success: true, sessions: sessionsWithoutFeedback });
		}
	})(req, res, next);
});



module.exports = router;
