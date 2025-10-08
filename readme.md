# 🎮 Projeto Nostalgia Gamer
O Nostalgia Gamer é um portal dedicado a relembrar e explorar a história de dois clássicos da saga Pokémon: Pokémon Fire Red e Pokémon Spyro. O objetivo é oferecer um espaço onde fãs possam revisitar esses títulos marcantes, conhecer detalhes sobre sua trajetória e relembrar momentos inesquecíveis das aventuras que marcaram gerações.

As principais funcionalidades incluem:  
- Publicação de conteúdos detalhados sobre a história de Pokémon Fire Red e Pokémon Spyro.
- Organização das informações por jogo, destacando enredos, personagens e curiosidades.  
- Layout otimizado para facilitar a leitura e a navegação em qualquer dispositivo. 

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **Banco de Dados:** MySQL  
- **Hospedagem:**  
  - Frontend: GitHub Pages  
  - Backend & Banco: Railway  

---

## 📊 Arquitetura
O sistema segue a arquitetura **cliente-servidor**.  

```mermaid
flowchart TD
    subgraph Client["Usuário / Navegador"]
        Browser["🌐 Navegador (HTML, CSS, JS)"]
    end

    subgraph Frontend["Frontend (GitHub Pages)"]
        Pages["GitHub Pages (HTML + CSS + JS)"]
    end

    subgraph Backend["Backend (Railway - Node.js + Express)"]
        API["API REST (server.js)"]
    end

    subgraph Database["Banco de Dados (MySQL - Railway)"]
        DB[("MySQL Database")]
    end

    %% Conexões
    Browser -->|"HTTP/HTTPS Request"| Pages
    Pages -->|"Fetch API / HTTP"| API
    API -->|"SQL Queries"| DB
    DB -->|"Resultados SQL"| API
    API -->|"JSON Response"| Pages
```

---

## 📂 Estrutura do Projeto
```
/frontend      → Código do site (HTML, CSS, JS)
/backend       → API em Node.js + Express
  ├── js/
  │   ├── app.js       → Ponto de entrada
  │   ├── db.js           → Conexão com o banco
  │   ├── controllers.js  → Lógica da aplicação
  ├── sql/                → Scripts SQL para criação de tabelas
```

---

## 🔄 Fluxo de Requisição
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend (GitHub Pages)
    participant B as Backend (Railway - Node.js)
    participant D as Banco de Dados (MySQL)

    U->>F: Acessa site pelo navegador
    F->>B: Requisição HTTP (GET /noticias)
    B->>D: Consulta SQL (SELECT * FROM noticias)
    D-->>B: Retorna resultados
    B-->>F: Resposta JSON com as notícias
    F-->>U: Renderiza as notícias na tela
```

---

## 💻 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/MiguelCTXX/nostalgia-gamer.git
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

### 3. Criar arquivo `.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha123
DB_NAME=noticias
PORT=5000
```

### 4. Rodar o servidor
```bash
npm start
# ou
node --require dotenv/config js/server.js
```

A API estará disponível em:  
👉 http://localhost:5000  

---

## 🌍 Deploy em Produção

No **Railway**, configurar as variáveis de ambiente:  
- DB_HOST  
- DB_PORT  
- DB_USER  
- DB_PASSWORD  
- DB_NAME  
- PORT  

Após isso, o backend ficará disponível online e o frontend no GitHub Pages poderá consumir a API.  

---

## 🔧 Extensões VSCode Recomendadas
- **Material Icon Theme** → Ícones de arquivos e pastas.  
- **Live Server** → Executa projeto localmente.  
- **Live Preview** → Pré-visualização de HTML.  
- **Code Runner** → Executa scripts JS no terminal.  

---

## 📑 Atalhos HTML Semântico
- `.nome` → Cria uma div com classe "nome".  
- `section.nome` → Cria uma section com classe "nome".  
- `section#nome` → Cria uma section com id "nome".  
- `section.nome1#nome2` → Cria uma section com classe "nome1" e id "nome2".  

---

## ⌨️ Atalhos VSCode
- `Alt + Shift + i` → Edição em várias linhas.  
- `Ctrl + F2` → Seleciona todas as ocorrências de um termo.  
- `Ctrl + ;` → Comenta/descomenta linhas.  
- `Alt + Z` → Quebra automática de linha.  

---

## 📚 Referências
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/)  
- [W3Schools](https://www.w3schools.com/)  

---

## ⚙️ Git Config Utils
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```