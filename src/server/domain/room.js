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

async function getRoomById(id) {
    const room = await prisma.room.findUnique({
        where: {
            id: id
        }
    })
    return room;
}

async function addUserToRoom(userId, roomId) {
    const room = await prisma.room.update({
        where: { id: roomId },
        data: {
            users: {
                connect: [{ id: userId }]
            }
        }
    });
    return room;
}

async function getRoomsByUserId(userId) {
    const rooms = await prisma.room.findMany({
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        }
    });
    return rooms;
}

module.exports = {
    getAllRooms,
    createRoom,
    deleteRoom,
    getRoomById,
    addUserToRoom,
    getRoomsByUserId
};