const {
    createRoom,
    getAllRooms
} = require('../domain/room' ) 
// import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
// import { errorCodes } from '../utils/dbClient.js'

const create = async (req, res) => {
    try {
        const createdRoom = await createRoom(req.body)

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