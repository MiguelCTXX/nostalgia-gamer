const { conectar, desconectar } = require('./db');
const bcrypt = require('bcrypt');


async function inserir_usuario(user) {
    const { nome, usuario, cpf, telefone, data_nascimento, email } = user;
    const senha = await bcrypt.hash(user.senha, 10);

    const conn = await conectar();
    const query = 'INSERT INTO usuarios (nome, usuario, cpf, telefone, data_nascimento, email, senha ) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await conn.execute(query, [nome, usuario, cpf, telefone, data_nascimento, email, senha]);
    await desconectar(conn);
}

async function autenticar_usuario(usuario) {
    const { email, senha } = usuario;
    const conn = await conectar();

    // Busca usuário pelo email
    const [rows] = await conn.execute(
        'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
        [email]
    );

    await desconectar(conn);

    // Se não achou usuário
    if (rows.length === 0) {
        return { sucesso: false, mensagem: 'Usuário não encontrado' };
    }

    const usuarioDB = rows[0];

    // Compara a senha informada com a senha hash
    const senhaCorreta = await bcrypt.compare(senha, usuarioDB.senha);

    if (!senhaCorreta) {
        return { sucesso: false, mensagem: 'Senha incorreta' };
    }

    return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso',
        usuario: { id: usuarioDB.id, nome: usuarioDB.nome, email: usuarioDB.email },

    };
}

module.exports = { inserir_usuario, autenticar_usuario };
