const express = require('express');
const {
    create,
    getByRoom
} = require('../controllers/message');

const router = express.Router();

router.post('/', create)
router.get('/room/:roomId', getByRoom);


module.exports = router;