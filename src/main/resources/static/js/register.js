document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerError = document.getElementById('registerError');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!registerForm.checkValidity()) {
                registerForm.classList.add('was-validated');
                return;
            }
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const res = await fetch('/api/user/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                if (res.ok) {
                    alert('Register berhasil! Silakan login.');
                    window.location.href = 'login.html';
                } else {
                    const msg = await res.text();
                    registerError.textContent = msg || 'Register gagal';
                    registerError.classList.remove('d-none');
                }
            } catch (err) {
                registerError.textContent = 'Terjadi error saat register';
                registerError.classList.remove('d-none');
            }
        });
    }
}); 