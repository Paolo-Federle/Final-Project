const express = require('express');
import {  } from "module"; {
    register,
    login,
    getAll
} from ('../controllers/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAll);

module.exports = router;