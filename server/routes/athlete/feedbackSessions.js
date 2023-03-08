const express = require('express');
const { isEmpty } = require('lodash');
const router = express.Router();
const passport = require('passport');
const { getUserById } = require('../../repositories/user.repository');
const { 
    createAthleteFeedback,
    getFeedbackSessionIfProvided,
} = require('../../services/athlete/feedbackSessions');

require('../../middlewares/auth');

router.post('/athlete/feedbackSession/create', async (req, res, next) => {
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

            if(userLogged.type != 1)
            {
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
            let feedbackCreated;

            console.log('req.body :>> ', req.body);

            try {
                feedbackCreated = await createAthleteFeedback(user.id, sessionId, shape, tiredness, stress, sensation, injury);

            }
            catch(err)
            {
                return { success: false , erreur: err};
            }

            const formattedFeedbackCreated = { success: true , sessionId: sessionId};

            return res.send(formattedFeedbackCreated);
		}
	})(req, res, next);
});

router.get('/athlete/feedbackSession', async (req, res, next) => {
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

            if(userLogged.type != 1)
            {
                return res.json({
                    success: false,
                    error: 'You are not authorized to get the feedback',
                });
            }

            const sessionId = parseInt(req.query.sessionId);
            let feedbackProvided;
            try {
                feedbackProvided = await getFeedbackSessionIfProvided(userLogged.id, sessionId);
            }
            catch(err)
            {
                return res.send({ success: false , error: {err}})
            }
            const formattedFeedbackProvided = { success: true , sessionFeedback: (isEmpty(feedbackProvided) ? null : feedbackProvided)};

            return res.send(formattedFeedbackProvided);
		}
	})(req, res, next);
});

module.exports = router;
