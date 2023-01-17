const {
    getAllRooms,
    createRoom,
    deleteRoom,
    getRoomById
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

const deleteOne = async (req, res) => {
    try {
        const id =  parseInt(req.params.id)
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

module.exports = {
    create,
    getAll,
    deleteOne,
    getById
};