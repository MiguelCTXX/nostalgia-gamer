// ---------------------- MOSTRAR/ESCONDER FORMULÁRIOS ----------------------
function mostrarCadastro() {
    const loginForm = document.getElementById("formulario-login");
    const cadForm = document.getElementById("formulario-cadastro");
    if (loginForm) loginForm.classList.add("oculto");
    if (cadForm) cadForm.classList.remove("oculto");
}

function mostrarlogin() {
    const loginForm = document.getElementById("formulario-login");
    const cadForm = document.getElementById("formulario-cadastro");
    if (loginForm) loginForm.classList.remove("oculto");
    if (cadForm) cadForm.classList.add("oculto");
}

// ---------------------- TOGGLE SENHA ----------------------
function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// ---------------------- LIGHTBOX ----------------------
function fecharLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (lb) lb.classList.add('d-none');
    if (lbImg) lbImg.src = '';
}

document.querySelectorAll('.miniatura').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        const srcGrande = img.getAttribute('data-grande') || img.src;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = srcGrande;
        lightbox.classList.remove('d-none');
    });
});

document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') fecharLightbox();
});

// ---------------------- TOAST ----------------------
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type); // success ou error
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ---------------------- CADASTRO DE USUÁRIO ----------------------
async function cadastrar_usuario(event) {
    event.preventDefault();
    try {
        const usuario = {
            nome: document.getElementById("nome-cadastro").value,
            usuario: document.getElementById("usuario-cadastro").value,
            cpf: document.getElementById("cpf-cadastro").value,
            telefone: document.getElementById("telefone-cadastro").value,
            data_nascimento: document.getElementById("data_nascimento-cadastro").value,
            email: document.getElementById("email-cadastro").value,
            senha: document.getElementById("password-cadastro").value
        };

        const requisicao = await fetch("https://nostalgia-gamer-production.up.railway.app/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const resposta = await requisicao.json();
        if (!requisicao.ok) throw new Error(resposta.mensagem || "Erro ao cadastrar usuário");

        showToast(resposta.mensagem || "Usuário cadastrado com sucesso!", "success");
        mostrarlogin();
    } catch (erro) {
        showToast("Falha ao cadastrar usuário: " + erro.message, "error");
    }
}

// ---------------------- LOGIN DE USUÁRIO ----------------------
async function logar_usuario(event) {
    event.preventDefault();
    try {
        const usuario = {
            email: document.getElementById("email-login").value,
            senha: document.getElementById("password-login").value
        };

        const requisicao = await fetch("https://nostalgia-gamer-production.up.railway.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
            credentials: "include"
        });

        const resposta = await requisicao.json();
        if (!requisicao.ok || resposta.sucesso === false) {
            throw new Error(resposta.mensagem || resposta.erro || "Credenciais inválidas");
        }

        showToast("Login realizado com sucesso! Bem-vindo " + (resposta.usuario?.nome || ""), "success");

        await setTimeout(() => {
            window.location.href = "pokemons.html";
        }, 1000);
        window.location.reload(); // força recarregar e pegar a sessão
    } catch (erro) {
        console.error(erro);
        showToast("Falha no login: " + erro.message, "error");
    }
}

// ---------------------- VERIFICAR SESSÃO ----------------------
// async function verificarSessao() {
//     try {
//         const resp = await fetch("https://nostalgia-gamer-production.up.railway.app/verificarSessao", {
//             method: "GET",
//             credentials: "include"
//         });

//         const data = await resp.json();
//         const loginBtn = document.getElementById("button-login");

//         if (loginBtn) {

//             if (data.logado) {
//                 // Se o usuário estiver logado, troca o HTML do botão
//                 loginBtn.innerHTML = `
//                 <div class="user-circle" id="user-circle" title="Logado como ${data.usuario.nome}">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" 
//                         viewBox="0 0 24 24" fill="none" stroke="#00ff00" 
//                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                         <circle cx="12" cy="8" r="5"/>
//                         <path d="M20 21a8 8 0 0 0-16 0"/>
//                     </svg>
//                 </div>
//                 <button id="logout-btn" class="btn btn-sm btn-danger ms-2">Sair</button>
//             `;

//                 // Ativa o botão de logout
//                 document.getElementById("logout-btn").addEventListener("click", logout_usuario);

//             } else {
//                 // Se não estiver logado, volta pro botão de entrar
//                 loginBtn.innerHTML = `
//                 <a href="login.html">Entrar</a>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
//                     viewBox="0 0 24 24" fill="none" stroke="#ffffff" 
//                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                     <circle cx="12" cy="8" r="5"/>
//                     <path d="M20 21a8 8 0 0 0-16 0"/>
//                 </svg>
//             `;
//             }
//         }
//     } catch (err) {
//         console.error("Erro ao verificar sessão:", err);
//     }
// }

async function verificarSessao() {
    try {
        const resp = await fetch("https://nostalgia-gamer-production.up.railway.app/verificarSessao", {
            method: "GET",
            credentials: "include"
        });

        const data = await resp.json();
        const areaUsuario = document.getElementById("area-usuario");

        if (!areaUsuario) return; // garante que o elemento existe

        if (data.logado) {
            // Usuário logado
            areaUsuario.innerHTML = `
                <div class="user-circle" id="user-circle" title="Logado como ${data.usuario.nome}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" 
                        viewBox="0 0 24 24" fill="none" stroke="#00ff00" 
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="5"/>
                        <path d="M20 21a8 8 0 0 0-16 0"/>
                    </svg>
                </div>
                <button id="logout-btn" class="btn btn-sm btn-danger ms-2">Sair</button>
            `;

            // Evento de logout
            document.getElementById("logout-btn").addEventListener("click", logout_usuario);

        } else {
            // Usuário não logado
            areaUsuario.innerHTML = `
                <a href="login.html" class="text-white me-2">Entrar</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="#ffffff" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="5"/>
                    <path d="M20 21a8 8 0 0 0-16 0"/>
                </svg>
            `;
        }

    } catch (err) {
        console.error("Erro ao verificar sessão:", err);
    }
}



// ---------------------- LOGOUT ----------------------
async function logout_usuario() {
    try {
        const resp = await fetch("https://nostalgia-gamer-production.up.railway.app/logout", {
            method: "POST",
            credentials: "include"
        });

        const data = await resp.json();
        if (data.sucesso) {
            showToast("Você saiu da conta!", "success");
            // setTimeout(() => window.location.href = "login.html", 1000);
        } else {
            showToast("Erro ao sair!", "error");
        }
    } catch (err) {
        console.error("Erro no logout:", err);
        showToast("Erro no logout: " + err.message, "error");
    }
}

// ---------------------- HAMBURGER MOBILE ----------------------
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('active');
});

// ---------------------- EVENTOS AO CARREGAR ----------------------
document.addEventListener("DOMContentLoaded", () => {
    verificarSessao();
    const formLogin = document.getElementById("formulario-login");
    const formCadastro = document.getElementById("formulario-cadastro");

    if (formLogin) formLogin.addEventListener("submit", logar_usuario);
    if (formCadastro) formCadastro.addEventListener("submit", cadastrar_usuario);


});
