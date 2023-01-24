const express = require('express');
const {
    register,
    login,
    getAll,
    getById,
    deleteOne,
    getByUsername
} = require('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAll);
router.get('/:id', getById)
router.delete('/:id', deleteOne)
router.get('/username/:username', getByUsername);

module.exports = router;