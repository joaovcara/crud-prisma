// Inicialização da aplicação

window.addEventListener('load', () => {
    if (AUTH.isAuthenticated()) {
        showPage('dashboard');
        loadUsers();
    } else {
        showPage('login');
    }
});
