-- CREATE DATABASE usuarios;

-- USE pokemons;

-- -- criacao de usuarios
-- CREATE USER 'lucca' @'%' IDENTIFIED BY 'password';
-- -- garintias aos usuarios criados
-- GRANT ALL PRIVILEGES ON *.* TO 'lucca' @'%' WITH GRANT OPTION;

-- DROP DATABASE pokemons;

-- CREATE TABLE usuarios (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     nome VARCHAR(100),
--     email VARCHAR(100) UNIQUE,
--     senha VARCHAR(150)
-- );

-- INSERT INTO
--     usuarios (
--         nome,
--         email,
--         senha
--     )
-- VALUES (
--         'João',
--         '12345678901',
--         'joao.silva@email.com',
--         '1990-05-12',
--         'voverine123'
--     );

-- SELECT * FROM usuarios;





CREATE DATABASE IF NOT EXISTS pokemons;


USE pokemons;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);