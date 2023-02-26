const testRoute = require('./routes/test');
const authRoute = require('./routes/auth');
const loginRoute = require('./routes/login');

const allRoutes=[authRoute,testRoute, loginRoute];

module.exports = allRoutes;