const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllUser() {
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    })
    return { users: allUsers }
}

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return { user };
}

module.exports = {
    getAllUser,
    getUserById
};