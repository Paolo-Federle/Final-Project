const express = require('express');

const {
    getAll,
    create,
    deleteOne,
    getById,
    addUser,
    getRoomsByUser,
    createRoomAndAddUser,
    addUserByUsername,
    removeUserByUsername
} = require('../controllers/room');

const router = express.Router();
router.post('/', create)
router.get('/', getAll);
router.delete('/:id', deleteOne);
router.delete('/:id/user', removeUserByUsername);
router.get('/:id', getById);
router.put('/adduser', addUser)
router.get('/user/:userId', getRoomsByUser)
router.post('/user/:userId', createRoomAndAddUser);
router.put('/adduserByUsername', addUserByUsername)



module.exports = router;