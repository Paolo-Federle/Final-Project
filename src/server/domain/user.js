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

module.exports = {
    getAllUser
};