const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Registrar um novo usuário
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criar novo usuário
        const user = await User.create({ username, email, password });

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Autenticar um usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao autenticar usuário', error });
    }
};

module.exports = { registerUser, loginUser };