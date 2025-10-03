🎮 Projeto Nostalgia Gamer
O Nostalgia Gamer é um portal dedicado a relembrar e explorar a história de dois clássicos da saga Pokémon: Pokémon Fire Red e Pokémon Spyro. O objetivo é oferecer um espaço onde fãs possam revisitar esses títulos marcantes, conhecer detalhes sobre sua trajetória e relembrar momentos inesquecíveis das aventuras que marcaram gerações.

As principais funcionalidades incluem:

Publicação de conteúdos detalhados sobre a história de Pokémon Fire Red e Pokémon Spyro.
Organização das informações por jogo, destacando enredos, personagens e curiosidades.
Layout otimizado para facilitar a leitura e a navegação em qualquer dispositivo.
🚀 Tecnologias Utilizadas
Front-end: HTML, CSS, JavaScript
Backend: Node.js + Express
Banco de Dados: MySQL
Hospedagem:
Frontend: Páginas do GitHub
Backend e Banco: Railway
📊 Arquitetura
O sistema segue a arquitetura cliente-servidor .


📂 Estrutura do Projeto
/frontend      → Código do site (HTML, CSS, JS)
/backend       → API em Node.js + Express
  ├── js/
  │   ├── app.js       → Ponto de entrada
  │   ├── db.js           → Conexão com o banco
  │   ├── controllers.js  → Lógica da aplicação
  ├── sql/                → Scripts SQL para criação de tabelas
🔄 Fluxo de Requisição

💻 Como Executar Localmente
1. Clonar o repositório
git clone https://github.com/MiguelCTXX/nostalgia-gamer.git
2. Configurar Backend
cd backend
npm install
3. Criar arquivo.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha123
DB_NAME=noticias
PORT=5000
4. Rodar o servidor
npm start
# ou
node --require dotenv/config js/server.js
A API estará disponível em:
👉 http://localhost:5000

🌍 Implantar em Produção
No Railway , configure as variáveis ​​de ambiente:

DB_HOST
PORTA_BD
USUÁRIO_BD
SENHA_BD
NOME_BD
PORTA
Após isso, o backend ficará disponível online e o frontend no GitHub Pages poderá consumir uma API.

🔧 Extensões VSCode Recomendadas
Material Icon Theme → Ícones de arquivos e pastas.
Live Server → Executa o projeto localmente.
Live Preview → Pré-visualização de HTML.
Code Runner → Executa scripts JS no terminal.
📑 Atalhos HTML Semântico
.nome→ Crie uma div com classe "nome".
section.nome→ Crie uma seção com classe "nome".
section#nome→ Cria uma seção com id "nome".
section.nome1#nome2→ Crie uma seção com classe "nome1" e id "nome2".
⌨️ Atalhos VSCode
Alt + Shift + i→ Edição em várias linhas.
Ctrl + F2→ Selecionado todas as ocorrências de um termo.
Ctrl + ;→ Comenta/descomenta linhas.
Alt + Z→ Quebra automática de linha.
📚 Referências
Documentação da Web MDN
W3Escolas
⚙️ Utilitários de configuração do Git
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
