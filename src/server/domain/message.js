const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMessage(content, roomId, senderId) {
    const message = await prisma.message.create({
        data: {
            content,
            room: {
                connect: {
                    id: roomId
                }
            },
            sender: {
                connect: {
                    id: senderId
                }
            }
        }
    });
    return message;
}


async function getByRoomId(roomId) {
    const messagesByRoom = await prisma.message.findMany({
        where: {
            roomId
        },
        include: {
            sender: {
                select: {
                    username: true
                }
            }
        }
    });
    return messagesByRoom
};


module.exports = {
    createMessage,
    getByRoomId
};