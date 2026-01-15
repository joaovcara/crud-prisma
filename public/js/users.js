// Lógica de CRUD de usuários

// Botão para abrir modal de criar usuário
document.getElementById('openCreateModalBtn')?.addEventListener('click', openCreateModal);

// Criar usuário
document.getElementById('createUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;

    try {
        await createUser(name, email, password);
        showAlert('successAlert', 'Usuário criado com sucesso!', 'success');
        closeCreateModal();
        loadUsers();
    } catch (error) {
        showAlert('errorAlert', error.message, 'error');
    }
});

// Carregar usuários
async function loadUsers() {
    try {
        document.getElementById('usersLoading').classList.add('active');
        document.getElementById('usersTable').style.display = 'none';
        document.getElementById('noUsersData').style.display = 'none';

        const response = await getUsers();

        if (response && Array.isArray(response)) {
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = '';

            if (response.length === 0) {
                document.getElementById('noUsersData').style.display = 'block';
            } else {
                response.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${formatDate(user.createdAt)}</td>
                        <td>
                            <button class="btn-action btn-edit" onclick="openEditModal(${user.id}, '${user.name.replace(/'/g, "\\'")}', '${user.email.replace(/'/g, "\\'")}')" data-id="${user.id}">Editar</button>
                            <button class="btn-action btn-delete" onclick="openDeleteModal(${user.id})" data-id="${user.id}">Deletar</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
                document.getElementById('usersTable').style.display = 'table';
            }
        }
    } catch (error) {
        showAlert('errorAlert', 'Erro ao carregar usuários', 'error');
    } finally {
        document.getElementById('usersLoading').classList.remove('active');
    }
}

// Editar usuário
document.getElementById('editUserForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;

    const updateData = { name, email };
    if (password) {
        updateData.password = password;
    }

    try {
        await updateUser(id, updateData);
        showAlert('successAlert', 'Usuário atualizado com sucesso!', 'success');
        closeEditModal();
        loadUsers();
    } catch (error) {
        showAlert('errorAlert', error.message, 'error');
    }
});

// Deletar usuário
async function handleDeleteUser(userId) {
    try {
        await deleteUser(userId);
        showAlert('successAlert', 'Usuário deletado com sucesso!', 'success');
        closeDeleteModal();
        loadUsers();
    } catch (error) {
        showAlert('errorAlert', error.message, 'error');
    }
}

// Listener para o botão de confirmar delete
document.getElementById('confirmDeleteBtn')?.addEventListener('click', async (e) => {
    const userId = e.target.dataset.userId;
    if (userId) {
        await handleDeleteUser(userId);
    }
});
