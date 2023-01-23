const express = require('express');

const {
    getAll,
    create,
    deleteOne,
    getById,
    addUser,
    getRoomsByUser,
    createRoomAndAddUser
} = require('../controllers/room');

const router = express.Router();
router.post('/', create)
router.get('/', getAll);
router.delete('/:id', deleteOne);
router.get('/:id', getById);
router.put('/adduser', addUser)
// http://localhost:4000/room/adduser
// {
//     "roomId": 4,
//     "userId": 3
// }
router.get('/user/:userId', getRoomsByUser)
router.post('/user/:userId', createRoomAndAddUser);



module.exports = router;