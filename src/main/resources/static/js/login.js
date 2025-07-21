document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!loginForm.checkValidity()) {
                loginForm.classList.add('was-validated');
                return;
            }
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const res = await fetch('/api/user/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                if (res.ok) {
                    const user = await res.json();
                    // Save session using session manager
                    if (window.sessionManager) {
                        window.sessionManager.saveSession(user);
                    } else {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    // Redirect sesuai role
                    if (user.role === 'ADMIN') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    const msg = await res.text();
                    loginError.textContent = msg || 'Login gagal';
                    loginError.classList.remove('d-none');
                }
            } catch (err) {
                loginError.textContent = 'Terjadi error saat login';
                loginError.classList.remove('d-none');
            }
        });
    }
}); 