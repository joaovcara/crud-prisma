// Configuração global da aplicação
const CONFIG = {
    API_URL: 'http://localhost:3000',
    ALERTS_TIMEOUT: 4000,
    DATE_LOCALE: 'pt-BR',
};

// Armazena dados de autenticação
const AUTH = {
    token: localStorage.getItem('auth_token'),
    user: localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')) : null,

    setToken(token) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    },

    setUser(user) {
        this.user = user;
        localStorage.setItem('current_user', JSON.stringify(user));
    },

    clear() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
    },

    isAuthenticated() {
        return this.token && this.user;
    }
};
