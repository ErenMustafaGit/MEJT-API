const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (email) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (err) {
		return err;
	}
};

const createUser = async (email, name, password) => {
	try {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password,
			},
		});
		return user;
	}
	catch (err) {
		return err;
	};
};

module.exports = {
	getUser,
	createUser,
};
