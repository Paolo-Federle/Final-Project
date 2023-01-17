const {
    getAllRooms,
    createRoom
} = require('../domain/room' ) 
const { sendDataResponse, sendMessageResponse } = require('../utils/responses.js')

const create = async (req, res) => {
    try {
        const createdRoom = await createRoom()

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

module.exports = {
    create,
    getAll
};