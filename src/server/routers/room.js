const express = require('express');

const {
    getAll,
    create
} = require('../controllers/room');

const router = express.Router();
router.post('/', create)
router.get('/', getAll);

module.exports = router;