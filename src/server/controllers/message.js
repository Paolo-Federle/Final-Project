const {
    createMessage,
    getByRoomId
} = require('../domain/message')
const { sendDataResponse, sendMessageResponse } = require('../utils/responses.js')

const create = async (req, res) => {
    const { content, roomId, userId } = req.body;
    try {
        // add check for roomId and userID
        // maybe just import those functions that should have a check
        const createdMessage = await createMessage(content, parseInt(roomId), parseInt(userId));

        return sendDataResponse(res, 201, createdMessage);
    } catch (e) {
        console.error(e);
        return sendMessageResponse(res, 500, 'Unable to create message');
    }
}

const getByRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        // add check for roomId
        // maybe just import those functions that should have a check
        const messages = await getByRoomId(parseInt(roomId));
        return sendDataResponse(res, 200, messages);
    } catch (error) {
        console.error(error);
        return sendMessageResponse(res, 500, 'Unable to fetch messages');
    }
}

module.exports = {
    create,
    getByRoom
};