const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (email) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};

const createUser = async (email, name, password) => {
	const user = await prisma.user.create({
		data: {
			email,
			name,
			password,
		},
	});
	return user;
};

module.exports = {
	getUser,
	createUser,
};
