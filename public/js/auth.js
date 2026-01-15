// Lógica de autenticação

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await loginUser(email, password);
        
        if (response) {
            AUTH.setToken(response.access_token);
            AUTH.setUser(response.user);

            document.getElementById('loginForm').reset();
            showPage('dashboard');
            loadUsers();
        }
    } catch (error) {
        showAlert('loginError', error.message, 'error');
    }
});

// Registro
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        await createUser(name, email, password);
        showAlert('registerError', 'Conta criada com sucesso! Faça login para continuar.', 'success');
        setTimeout(() => {
            document.getElementById('registerForm').reset();
            showPage('login');
        }, 2000);
    } catch (error) {
        showAlert('registerError', error.message, 'error');
    }
});

// Navegação entre login e registro
document.getElementById('goToRegisterBtn')?.addEventListener('click', () => showPage('register'));
document.getElementById('goToLoginBtn')?.addEventListener('click', () => showPage('login'));

// Logout
function logout() {
    AUTH.clear();
    showPage('login');
}

document.getElementById('logoutBtn')?.addEventListener('click', logout);
