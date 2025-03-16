// Importar dependências
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Criar uma instância do Express
const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors()); // Permitir requisições de diferentes origens
app.use(bodyParser.json()); // Processar requisições JSON

// Rotas
app.use('/api/auth', authRoutes); // Usar as rotas de autenticação

// Rota de teste
app.get('/', (req, res) => {
    res.send('Backend está funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});