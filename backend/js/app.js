const session = require("express-session");
const express = require('express');
const cors = require('cors');
const { inserir_usuario, autenticar_usuario, criarTabelas } = require('./controller');

const app = express();

app.use(express.json());

app.use(cors());

criarTabelas();

app.use(session({
    secret: "segredo-super-seguro",  // troque para um segredo forte
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // se for HTTPS, coloque true
}));

app.post('/register', async (req, res) => {
    try {
        const novo_usuario = req.body;
        await inserir_usuario(novo_usuario);
        res.status(201).send({ mensagem: 'Usuário inserido com sucesso!' });
    } catch (err) {
        console.error("Erro no servidor:", err); // <--- Mostra no console do Node
        res.status(500).send({ erro: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const resultado = await autenticar_usuario(req.body);
        if (!resultado.sucesso) { return res.status(401).json(resultado); }

        req.session.user = { nome: resultado.usuario.nome };
        res.status(200).json(resultado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, mensagem: "Erro ao autenticar usuário." });
    }
    console.log(req.session)
});


app.get("/verificarSessao", (req, res) => {
    if (req.session.user) {
        return res.json({
            logado: true,
            usuario: req.session.user
        });
    } else {
        return res.json({ logado: false });
    }
});

// Logout
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ sucesso: false, mensagem: "Erro ao sair" });
        res.clearCookie("connect.sid");
        res.json({ sucesso: true });
    });
});

app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
});
