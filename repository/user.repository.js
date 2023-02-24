const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getUser(username, password)
{
  const user = await prisma.user.findUnique({
    where: {
      email: username,
      password: password
    },
  })

  return user;
}
