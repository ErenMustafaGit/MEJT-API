const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (email) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (err) {
		return err;
	}
};

const createUser = async (email, name, password, type) => {
	try {
		const typeFormatted = parseInt(type);
		const user = await prisma.users.create({
			data: {
				email,
				name,
				password,
				type:typeFormatted
			},
		});
		return user;
	} catch (err) {
		return err;
	}
};

module.exports = {
	getUser,
	createUser,
};
