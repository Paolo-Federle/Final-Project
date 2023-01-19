const {
    getAllRooms,
    createRoom,
    deleteRoom,
    getRoomById,
    addUserToRoom,
    getRoomsByUserId
} = require('../domain/room')
const { getUserById } = require('../domain/user')
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
        const room = await getRoomById(roomId)
        if (!room) {
            return sendMessageResponse(res, 404, 'Room not found')
        }
        const user = await getUserById(userId)
        if (!user) {
            return sendMessageResponse(res, 404, 'User not found')
        }

        const updatedRoom = await addUserToRoom(userId, roomId)
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

module.exports = {
    create,
    getAll,
    deleteOne,
    getById,
    addUser,
    getRoomsByUser 
};