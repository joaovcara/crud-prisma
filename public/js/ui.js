// Funções de UI e navegação

// Mostrar/Ocultar páginas
function showPage(pageName) {
    document.querySelectorAll('.login-container, .dashboard-container').forEach(el => {
        el.classList.remove('active');
    });

    if (pageName === 'login') {
        document.getElementById('loginPage').classList.add('active');
    } else if (pageName === 'register') {
        document.getElementById('registerPage').classList.add('active');
    } else if (pageName === 'dashboard') {
        document.getElementById('dashboardPage').classList.add('active');
        updateUserInfo();
    }
}

function updateUserInfo() {
    if (AUTH.user) {
        document.getElementById('currentUserName').textContent = AUTH.user.name;
        document.getElementById('currentUserEmail').textContent = AUTH.user.email;
    }
}

// Gerenciar alertas
function showAlert(elementId, message, type = 'success') {
    const alert = document.getElementById(elementId);
    alert.textContent = message;
    alert.classList.add('active');
    alert.className = `alert active alert-${type}`;
    
    setTimeout(() => {
        alert.classList.remove('active');
    }, CONFIG.ALERTS_TIMEOUT);
}

// Formatar datas
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(CONFIG.DATE_LOCALE, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Modal de Criação
function openCreateModal() {
    document.getElementById('createModal').classList.add('active');
}

function closeCreateModal() {
    document.getElementById('createModal').classList.remove('active');
    document.getElementById('createUserForm').reset();
}

// Modal de Edição
function openEditModal(id, name, email) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPassword').value = '';
    document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    document.getElementById('editUserForm').reset();
}

// Modal de Confirmação de Delete
function openDeleteModal(userId) {
    document.getElementById('deleteModal').classList.add('active');
    document.getElementById('confirmDeleteBtn').dataset.userId = userId;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    delete document.getElementById('confirmDeleteBtn').dataset.userId;
}

// Fechar modal ao clicar fora
document.getElementById('createModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('createModal')) {
        closeCreateModal();
    }
});

document.getElementById('editModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('editModal')) {
        closeEditModal();
    }
});

document.getElementById('deleteModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('deleteModal')) {
        closeDeleteModal();
    }
});
