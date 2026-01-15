// Funções de API
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (AUTH.token) {
        options.headers['Authorization'] = `Bearer ${AUTH.token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}${endpoint}`, options);
        
        if (response.status === 401) {
            logout();
            return null;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API
async function loginUser(email, password) {
    return apiCall('/auth/login', 'POST', { email, password });
}

// User API
async function createUser(name, email, password) {
    return apiCall('/user', 'POST', { name, email, password });
}

async function getUsers() {
    return apiCall('/user', 'GET');
}

async function updateUser(id, data) {
    return apiCall(`/user?id=${id}`, 'PATCH', data);
}

async function deleteUser(id) {
    return apiCall(`/user?id=${id}`, 'DELETE');
}
