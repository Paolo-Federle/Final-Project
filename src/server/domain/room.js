const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getAllRooms() {
    const allRooms = await prisma.room.findMany()
    return { rooms: allRooms }
}

async function createRoom() {
    const createdRoom = await prisma.room.create({
        data: {
        }
    })
    return { createdRoom }
}

module.exports = {
    getAllRooms,
    createRoom
};