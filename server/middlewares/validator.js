const validators = require('../validators');

module.exports = function (validator) {
	// eslint-disable-next-line no-prototype-builtins
	if (!validators.hasOwnProperty(validator))
		throw new Error(`'${validator}' validator is not exist`);

	return async function (req, res, next) {
		try {
			const validated = await validators[validator].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			return res.json({ success: false, error: err.message });
		}
	};
};
