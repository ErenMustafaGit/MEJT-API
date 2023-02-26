const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async function (email, password) 
{
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password
    },
  })
};

module.exports = 
{
  getUser
}