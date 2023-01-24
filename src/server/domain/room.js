const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getAllRooms() {
    const allRooms = await prisma.room.findMany()
    return { rooms: allRooms }
}

async function createRoom(roomName) {
    const createdRoom = await prisma.room.create({
        data: {
            name: roomName
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
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            users: true,
            messages: true
        }
    })
    return room;
}

async function addUserByIdToRoom(userId, roomId) {
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

async function addUserByUsernameToRoom(username, roomId) {
    const room = await prisma.room.update({
        where: { id: roomId },
        data: {
            users: {
                connect: [{ username }]
            }
        }
    });
    return room;
}

async function removeUserByUsernameFromRoom(username, roomId) {
    const room = await prisma.room.update({
        where: { id: roomId },
        data: {
            users: {
                disconnect: [{ username }]
            }
        }
    });
    return room;
}

module.exports = {
    getAllRooms,
    createRoom,
    deleteRoom,
    getRoomById,
    addUserByIdToRoom,
    getRoomsByUserId,
    addUserByUsernameToRoom,
    removeUserByUsernameFromRoom
};