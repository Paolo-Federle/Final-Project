const express = require('express');
const {
    register,
    login,
    getAll,
    getById,
    deleteOne
} = require('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAll);
router.get('/:id', getById)
router.delete('/:id', deleteOne)

module.exports = router;