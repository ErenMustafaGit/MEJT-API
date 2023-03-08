const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

const { getUserById } = require('../../repositories/user.repository');
const { createSessionAndMappings } = require('../../services/trainer/sessions');
const { getTeamById } = require('../../repositories/team.repository');

require('../../middlewares/auth');

router.post('/trainer/sessions/create', async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (!user) {
			return res.json({
				success: false,
				error: 'The token is empty or is invalid',
			});
		} else {
			const userLogged = await getUserById(user.id);
			if (_.isEqual(userLogged?.success, false)) {
				return res.send(userLogged);
			}
			if (userLogged.type != 0) {
				return res.json({
					success: false,
					error: 'The user is not a trainer',
				});
			} else {
				const trainerId = user.id;
				const teamId = req.body.teamId;
				const date = new Date(req.body.date).toISOString();
				const place = req.body.place;
				const description = req.body.description;
				const name = req.body.name;
				const session = {trainerId, teamId, date, place, description, name};

				const team = await getTeamById(teamId);
                
				if (team === null) {
					return res.send({success:false,error:'The team does not exist'});
				} 
				try {
					createSessionAndMappings(session);
					return res.send({ success: true, teamId });
				} catch (err) {
					return res.send(err);
				}
			}
		}
	})(req, res, next);
});

module.exports = router;
