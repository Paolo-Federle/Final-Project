const express = require('express');

const {
    getAll,
    create,
    deleteOne,
    getById
} = require('../controllers/room');

const router = express.Router();
router.post('/', create)
router.get('/', getAll);
router.delete('/:id', deleteOne);
router.get('/:id', getById);

module.exports = router;