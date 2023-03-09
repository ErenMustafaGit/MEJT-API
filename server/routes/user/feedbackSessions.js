const express = require('express');
const { isEmpty } = require('lodash');
const router = express.Router();
const passport = require('passport');

const { getUserById } = require('../../repositories/user.repository');
const { 
	getFeedbacksByAthleteId,
	getFeedbackSessionIfProvided,
} = require('../../services/user/feedbackSessions');

require('../../middlewares/auth');

router.get('/user/feedbackSessions', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);
			const athleteId = (userLogged.type == 1 ? parseInt(userLogged.id) : parseInt(req.query.athleteId));

			if(userLogged.type != 1 && req.query.athleteId == null)
			{
				return res.json({
					success: false,
					error: 'No athlete ID provided',
				});
			}

			const teamId = (req.query.teamId == null ? undefined : parseInt(req.query.teamId));
			const startingDate = req.query.startingDate;
			const endingDate = req.query.endingDate;

			const athlete = await getFeedbacksByAthleteId(athleteId, teamId, startingDate, endingDate);
			const formattedFeedbacks = { success: true, athlete };
			return res.send(formattedFeedbacks);
		}
	})(req, res, next);
});

router.get('/user/singleFeedbackSession', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) 
		{
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		}
		else 
		{
			const userLogged = await getUserById(user.id);
			let athelteId = user.id;

			if(userLogged.type != 1)
			{
				if(req.query.athleteId != null)
				{
					athelteId = parseInt(req.query.athleteId);
				}
				else
				{
					return res.json({
						success: false,
						error: 'Athelte ID is missing',
					});
				}
			}

			let sessionId;

			if(req.query.sessionId == null)
			{
				return res.json({
					success: false,
					error: 'Session ID is missing',
				});
			}
			else
			{
				sessionId = parseInt(req.query.sessionId);
			}

			let feedbackProvided;
			try {
				feedbackProvided = await getFeedbackSessionIfProvided(athelteId, sessionId);
			}
			catch(err)
			{
				return res.send({ success: false , error: {err}});
			}
			const formattedFeedbackProvided = { success: true , sessionFeedback: (isEmpty(feedbackProvided) ? null : feedbackProvided)};

			return res.send(formattedFeedbackProvided);
		}
	})(req, res, next);
});


module.exports = router;
