const express = require('express');
const {
    register,
    login,
    getAll
} = require('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAll);

module.exports = router;