const express = require('express');

const {
    getAll,
    create,
    deleteOne
} = require('../controllers/room');

const router = express.Router();
router.post('/', create)
router.get('/', getAll);
router.delete('/:id', deleteOne);

module.exports = router;