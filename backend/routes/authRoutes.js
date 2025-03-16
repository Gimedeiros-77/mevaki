const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', registerUser);

// Rota para autenticar um usuário
router.post('/login', loginUser);

module.exports = router;