const userRepository = require('../repository/user.repository');

const getLogin = ((req, res) =>
{
    const username = String(req.params.username);
    const password = String(req.params.password);

    userRepository.getUser()
});

export default login;