const { Prisma } = require('@prisma/client');
const prisma = require('../../prisma/config');

const getUsersWithLastUpdate = async (teamId, userId) => {
	try {
		const usersWithLastFeedback = await prisma.users.findMany({
			where: {
				id: userId != null ? userId : undefined,
				users_team_mapping: {
					some: {
						teamId: teamId != null ? teamId : undefined,
					}
				}
			},
			select: {
				id: true,
				email: true,
				password: false,
				name: true,
				type: true,
				feedbacks_session: {
					select: {
						date: true,
					},
					where:{
						sessions: {
							is:
							{
								teamId,
							}
						},
					},
					orderBy: {
						date: 'desc'
					},
					take: 1,
				},
			},
		});
		return usersWithLastFeedback;
	} catch (err) {
		return err;
	}
};

const getUserByEmail = async (email) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (err) {
		if (err instanceof Prisma.PrismaClientInitializationError) {
			return {
				success: false,
				error:
          'An issue occurred during connection to the database. Please try again later.',
			};
		} else {
			return { success: false, error: 'Issue with database' };
		}
	}
};

const getUserById = async (userId) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				id:userId,
			},
		});
		if (!user) {
			return {
				success: false,
				error:
          'This user does not exist in the database.',
			};
		}
		return user;
	} catch (err) {
		if (err instanceof Prisma.PrismaClientInitializationError) {
			return {
				success: false,
				error:
          'An issue occurred during connection to the database. Please try again later.',
			};
		} else {
			return { success: false, error: 'Issue with database' };
		}
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
				type: typeFormatted,
			},
		});
		return user;
	} catch (err) {
		return err;
	}
};


module.exports = {
	getUserByEmail,
	getUserById,
	createUser,
	getUsersWithLastUpdate,
	
};
