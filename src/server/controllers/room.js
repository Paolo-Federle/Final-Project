const {
    getAllRooms,
    createRoom,
    deleteRoom,
    getRoomById,
    addUserByIdToRoom,
    getRoomsByUserId,
    addUserByUsernameToRoom,
    removeUserByUsernameFromRoom
} = require('../domain/room')
const { getUserById, getUserByUsername } = require('../domain/user')
const { sendDataResponse, sendMessageResponse } = require('../utils/responses.js')

const create = async (req, res) => {
    const { name } = req.body;
    try {
        const createdRoom = await createRoom(name);

        return sendDataResponse(res, 201, createdRoom)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to create cohort')
    }
}

const getAll = async (req, res) => {
    const allRooms = await getAllRooms()

    return sendDataResponse(res, 200, allRooms)
}

const deleteOne = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deletedRoom = await deleteRoom(id)

        return sendDataResponse(res, 200, deletedRoom)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to delete room')
    }
}

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const roomById = await getRoomById(id)

        return sendDataResponse(res, 200, roomById)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to find room')
    }
}

const addUser = async (req, res) => {
    const { roomId, userId } = req.body
    try {
        const room = await getRoomById(parseInt(roomId))
        if (!room) {
            return sendMessageResponse(res, 404, 'Room not found')
        }
        const user = await getUserById(parseInt(userId))
        if (!user) {
            return sendMessageResponse(res, 404, 'User not found')
        }

        const updatedRoom = await addUserByIdToRoom(userId, roomId)
        return sendDataResponse(res, 200, updatedRoom)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to add user to room')
    }
}

const getRoomsByUser = async (req, res) => {
    const { userId } = req.params
    if (!userId || isNaN(userId)) {
        return sendMessageResponse(res, 400, 'Invalid userId')
    }
    try {
        const rooms = await getRoomsByUserId(parseInt(userId))
        if (rooms.length === 0) {
            return sendMessageResponse(res, 404, 'User not found in any rooms.')
        }
        return sendDataResponse(res, 200, rooms)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to fetch rooms by user.')
    }
}

const createRoomAndAddUser = async (req, res) => {
    const { name } = req.body;
    const { userId } = req.params;

    try {
        const createdRoom = await createRoom(name);
        const user = await getUserById(parseInt(userId));

        if (!user) {
            return sendMessageResponse(res, 404, 'User not found');
        }
        await addUserByIdToRoom(parseInt(userId), createdRoom.createdRoom.id);

        return sendDataResponse(res, 201, createdRoom)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to create room and add user')
    }
}

const addUserByUsername = async (req, res) => {
    const { roomId, username } = req.body
    try {
        const room = await getRoomById(parseInt(roomId))
        if (!room) {
            return sendMessageResponse(res, 404, 'Room not found')
        }
        const user = await getUserByUsername(username)
        if (!user) {
            return sendMessageResponse(res, 404, 'User not found')
        }
        let userAlreadyInRoom = false;
        // Check if user is already inside the room
        for (let i = 0; i < user.rooms.length; i++) {
            if (user.rooms[i].id === room.id) {
                userAlreadyInRoom = true;
                break;
            }
        }
        if (userAlreadyInRoom) {
            return sendMessageResponse(res, 400, 'User is already in the room')
        }
        const updatedRoom = await addUserByUsernameToRoom(username, parseInt(roomId))
        return sendDataResponse(res, 200, updatedRoom)
    } catch (e) {
        console.error(e)
        return sendMessageResponse(res, 500, 'Unable to add user to room')
    }
}

const removeUserByUsername = async (req, res) => {
    const { roomId, username } = req.body;
    try {
        // check if room exists
        const room = await getRoomById(parseInt(roomId));
        if (!room) {
            return sendMessageResponse(res, 404, 'Room not found');
        }
        // check if user is inside the room
        if (!room.users.find(user => user.username === username)) {
            return sendMessageResponse(res, 404, 'User is not inside the room');
        }
        const updatedRoom = await removeUserByUsernameFromRoom(username, parseInt(roomId));
        return sendDataResponse(res, 200, updatedRoom);
    } catch (e) {
        console.error(e);
        return sendMessageResponse(res, 500, 'Unable to remove user from room');
    }
}

module.exports = {
    create,
    getAll,
    deleteOne,
    getById,
    addUser,
    getRoomsByUser,
    createRoomAndAddUser,
    addUserByUsername,
    removeUserByUsername
};