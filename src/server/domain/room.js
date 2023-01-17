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

async function deleteRoom(id) {
    const deletedRoom = await prisma.room.delete({
        where: {
            id: id
        }
    })
    return { deletedRoom }
}

module.exports = {
    getAllRooms,
    createRoom,
    deleteRoom
};