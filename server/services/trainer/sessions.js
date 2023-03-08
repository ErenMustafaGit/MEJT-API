const { createSession } = require('../../repositories/sessions.repository');

const createSessionAndMappings = async (session) => {
	try {
		const sessionCreated = await createSession(session);
		return sessionCreated;
		
	} catch (err) {
		return err;
	}
};

module.exports = { createSessionAndMappings };
