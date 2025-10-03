// ===========================================
// FUNÇÕES DE AUTENTICAÇÃO (BACKEND INTEGRATION)
// ===========================================

// ---------------------- CADASTRO DE USUÁRIO ----------------------
async function cadastrar_usuario(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';

    try {
        const usuario = {
            nome: document.getElementById("nome-cadastro").value.trim(),
            usuario: document.getElementById("usuario-cadastro").value.trim(),
            cpf: document.getElementById("cpf-cadastro").value.trim(),
            telefone: document.getElementById("telefone-cadastro").value.trim(),
            data_nascimento: document.getElementById("data_nascimento-cadastro").value,
            email: document.getElementById("email-cadastro").value.trim(),
            senha: document.getElementById("password-cadastro").value
        };

        // Validação básica no frontend (opcional: expanda para CPF/tel)
        if (!usuario.email || !usuario.senha || !usuario.nome) {
            throw new Error("Preencha todos os campos obrigatórios.");
        }

        const requisicao = await fetch("http://nostalgia-gamer-production.up.railway.app/login/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const resposta = await requisicao.json();
        if (!requisicao.ok) throw new Error(resposta.mensagem || "Erro ao cadastrar usuário");

        showToast(resposta.mensagem || "Usuário cadastrado com sucesso!", "success");
        
        // Limpa o form e volta para login
        event.target.reset();
        mostrarLogin(); // Ou fecharLogin() se quiser fechar completamente
        await verificarSessao(); // Atualiza navbar se necessário

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        showToast("Falha ao cadastrar usuário: " + erro.message, "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cadastrar';
    }
}

// ---------------------- LOGIN DE USUÁRIO ----------------------
async function logar_usuario(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    try {
        const usuario = {
            email: document.getElementById("email-login").value.trim(),
            senha: document.getElementById("password-login").value
        };

        // Validação básica
        if (!usuario.email || !usuario.senha) {
            throw new Error("Preencha e-mail e senha.");
        }

        const requisicao = await fetch("http://nostalgia-gamer-production.up.railway.app/login/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
            credentials: "include" // Para cookies de sessão
        });

        const resposta = await requisicao.json();
        if (!requisicao.ok || resposta.sucesso === false) {
            throw new Error(resposta.mensagem || resposta.erro || "Credenciais inválidas");
        }

        showToast("Login realizado com sucesso! Bem-vindo " + (resposta.usuario?.nome || ""), "success");
        
        // Limpa o form e fecha modal
        event.target.reset();
        fecharLogin();
        await verificarSessao(); // Atualiza navbar com ícone de usuário

    } catch (erro) {
        console.error("Erro no login:", erro);
        showToast("Falha no login: " + erro.message, "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';
    }
}

// ---------------------- VERIFICAR SESSÃO ----------------------
async function verificarSessao() {
    try {
        const resp = await fetch("http://nostalgia-gamer-production.up.railway.app/login/verificarSessao", {
            method: "GET",
            credentials: "include"
        });

        const data = await resp.json();
        const areaUsuario = document.getElementById("area-usuario");

        if (!areaUsuario) {
            console.warn("Elemento #area-usuario não encontrado. Verificação de sessão ignorada.");
            return;
        }

        if (data.logado) {
            // Usuário logado: Mostra ícone e botão sair
            areaUsuario.innerHTML = `
                <div class="user-circle ms-auto me-2" id="user-circle" title="Logado como ${data.usuario.nome}" style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" 
                        viewBox="0 0 24 24" fill="none" stroke="#00ff00" 
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="5"/>
                        <path d="M20 21a8 8 0 0 0-16 0"/>
                    </svg>
                </div>
                <button id="logout-btn" class="btn btn-sm btn-outline-danger me-2">Sair</button>
            `;
            // Evento de logout (apenas se não existir)
            const logoutBtn = document.getElementById("logout-btn");
            if (logoutBtn && !logoutBtn.hasAttribute('data-logout-attached')) {
                logoutBtn.addEventListener("click", logout_usuario);
                logoutBtn.setAttribute('data-logout-attached', 'true');
            }
        } else {
            // Não logado: Mostra botão Entrar
            areaUsuario.innerHTML = `
                <button class="btn button me-2" onclick="mostrarLogin()" aria-label="Entrar na conta">
                    Entrar
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-user-round-icon lucide-user-round ms-2">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                </button>
            `;
        }

    } catch (err) {
        console.error("Erro ao verificar sessão:", err);
        // Fallback: Assume não logado
        const areaUsuario = document.getElementById("area-usuario");
        if (areaUsuario) {
            areaUsuario.innerHTML = `
                <button class="btn button me-2" onclick="mostrarLogin()" aria-label="Entrar na conta">
                    Entrar
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="ms-2">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                </button>
            `;
        }
    }
}

// ---------------------- LOGOUT ----------------------
async function logout_usuario() {
    try {
        const resp = await fetch("http://nostalgia-gamer-production.up.railway.app/login/logout", {
            method: "POST",
            credentials: "include"
        });

        const data = await resp.json();
        if (data.sucesso) {
            showToast("Você saiu da conta!", "success");
            await verificarSessao(); // Atualiza navbar
            fecharLogin(); // Fecha modal se aberto
            // Opcional: setTimeout(() => window.location.reload(), 1000); // Recarrega página
        } else {
            showToast("Erro ao sair!", "error");
        }
    } catch (err) {
        console.error("Erro no logout:", err);
        showToast("Erro no logout: " + err.message, "error");
    }
}

// ===========================================
// FUNÇÕES DO MODAL DE LOGIN/CADASTRO
// ===========================================

// Função para mostrar o modal de login
function mostrarLogin() {
    const modal = document.getElementById('modal-login');
    if (!modal) return;
    modal.classList.remove('hidden');
    // Animação fade-in
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    // Desabilita scroll no body
    document.body.style.overflow = 'hidden';
    // Mostra o formulário de login (oculta cadastro se visível)
    const formCadastro = document.getElementById('formulario-cadastro');
    const formLogin = document.getElementById('formulario-login');
    if (formCadastro) formCadastro.classList.add('oculto');
    if (formLogin) formLogin.classList.remove('oculto');
}

// Função para mostrar o formulário de cadastro dentro do modal
function mostrarCadastro() {
    const formLogin = document.getElementById('formulario-login');
    const formCadastro = document.getElementById('formulario-cadastro');
    if (formLogin) formLogin.classList.add('oculto');
    if (formCadastro) formCadastro.classList.remove('oculto');
}

// Função para fechar o modal
function fecharLogin() {
    const modal = document.getElementById('modal-login');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.opacity = ''; // Reseta a opacidade
    }, 300);
    // Reabilita scroll no body
    document.body.style.overflow = 'auto';
}

// ===========================================
// TOGGLE SENHA
// ===========================================
function togglePassword(id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    // Alterna o ícone
    const button = input.parentElement.querySelector('button[onclick="togglePassword(\'' + id + '\')"]');
    if (button) {
        button.textContent = input.type === "password" ? "👁" : "👁‍🗨";
        button.setAttribute('aria-label', input.type === "password" ? "Mostrar senha" : "Ocultar senha");
    }
}

// ===========================================
// LIGHTBOX
// ===========================================
function fecharLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (lb) lb.classList.add('d-none');
    if (lbImg) lbImg.src = '';
}

// ===========================================
// TOAST
// ===========================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast'; // Reset classes
    toast.classList.add(type); // success ou error
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===========================================
// HAMBURGER/SIDEBAR MOBILE
// ===========================================
function toggleSidebar() {
    const sidebar = document.getElementById('mobileMenu');
    if (sidebar) sidebar.classList.toggle('active');
}

// ===========================================
// EVENTOS CONSOLIDADOS (ÚNICO DOMCONTENTLOADED)
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    // Verificação de sessão ao carregar
    if (typeof verificarSessao === 'function') {
        verificarSessao();
    }

    // ---------------------- MODAL: Clique fora e ESC ----------------------
    const modal = document.getElementById('modal-login');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                fecharLogin();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal-login');
            if (modal && !modal.classList.contains('hidden')) {
                fecharLogin();
            }
        }
    });

    // ---------------------- SUBMIT FORMS LOGIN/CADASTRO ----------------------
    const formLogin = document.getElementById("formulario-login");
    const formCadastro = document.getElementById("formulario-cadastro");

    if (formLogin) {
        formLogin.addEventListener("submit", logar_usuario);
    }

    if (formCadastro) {
        formCadastro.addEventListener("submit", cadastrar_usuario);
    }

    // ---------------------- LIGHTBOX ----------------------
    document.querySelectorAll('.miniatura').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const srcGrande = img.getAttribute('data-grande') || img.src;
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = srcGrande;
                lightbox.classList.remove('d-none');
            }
        });
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') fecharLightbox();
        });
    }

    // ---------------------- HAMBURGER/SIDEBAR ----------------------
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', toggleSidebar);
    }

    // Fecha sidebar ao clicar em link
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });

    // Fecha sidebar ao redimensionar para desktop (opcional)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    // ---------------------- BOTÃO VOLTAR AO TOPO (se adicionar HTML #amem) ----------------------
    // window.onscroll = function() {
    //     const btn = document.getElementById('amem');
    //     if (btn && window.pageYOffset > 300) {
    //         btn.style.display = 'block';
    //     } else if (btn) {
    //         btn.style.display = 'none';
    //     }
    // };
});

// ===========================================
// FIM DO JS
// ===========================================
