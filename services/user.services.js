const userRepository = require('../repository/user.repository');

const getLogin = ((req, res) =>
{
    const username = String(req.params.username);
    const password = String(req.params.password);

    const user = userRepository.getUser(username, password);

    if(user === {})
    {
        res.send('empty');
    }
    else
    {
        res.send('ok');
    }
});

