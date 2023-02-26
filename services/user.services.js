const userRepository = require('../repository/user.repository');


const getLogin = ((email, password) =>
{
    const user = userRepository.getUser(email, password);

    if(user)
    {
        return null;
    }
    else
    {
        return user;
    }
});



module.exports = 
{
    getLogin
}