// Session Management
class SessionManager {
    constructor(onReady) {
        this.onReady = onReady;
        this.checkSession();
    }

    // Check if user is logged in
    checkSession() {
        const user = this.getCurrentUser();
        if (user) {
            this.showUserInfo(user);
        } else {
            this.showAuthButtons();
        }
        if (typeof this.onReady === 'function') {
            this.onReady(user);
        }
    }

    // Get current user from localStorage
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Save user session
    saveSession(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.showUserInfo(user);
    }

    // Clear session
    clearSession() {
        localStorage.removeItem('currentUser');
        this.showAuthButtons();
        // Redirect to home page
        window.location.href = 'index.html';
    }

    // Show user info and hide auth buttons
    showUserInfo(user) {
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('userName').textContent = `Selamat datang, ${user.username}!`;
        // Show/hide admin elements based on role
        if (user.role === 'ADMIN') {
            this.showAdminElements();
            this.hideUserElements();
            // Hanya tampilkan daftar pemesanan
            document.querySelectorAll('.section, .hero, .fitur, .kontak').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.auto-hide').forEach(el => el.classList.add('auto-hide'));
            const section = document.getElementById('pemesananList');
            if (section) {
                section.classList.remove('auto-hide');
                section.style.removeProperty('display');
                section.style.display = 'block';
                loadPemesananList();
                window.scrollTo({ top: section.offsetTop - 60, behavior: 'smooth' });
            }
            // Navbar: hanya tampilkan menu Daftar Pemesanan
            document.querySelectorAll('.navbar-nav .nav-item').forEach(item => {
                if (item.classList.contains('admin-only')) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            this.hideAdminElements();
            this.showUserElements();
            // Tampilkan semua section normal
            document.querySelectorAll('.section, .hero, .fitur, .kontak').forEach(el => el.style.display = '');
            document.querySelectorAll('.auto-hide').forEach(el => el.classList.remove('auto-hide'));
            // Navbar: tampilkan semua menu
            document.querySelectorAll('.navbar-nav .nav-item').forEach(item => {
                item.style.display = '';
            });
            showKamarList();
        }
    }

    // Show auth buttons and hide user info
    showAuthButtons() {
        document.getElementById('authButtons').style.display = 'flex';
        document.getElementById('userInfo').style.display = 'none';
        this.hideAdminElements();
        this.showUserElements();
        // Hapus auto-hide dari semua section agar tampilan normal
        document.querySelectorAll('.auto-hide').forEach(el => el.classList.remove('auto-hide'));
    }

    // Show admin-only elements
    showAdminElements() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            element.style.display = 'block';
        });
    }

    // Hide admin-only elements
    hideAdminElements() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Show user-only elements
    showUserElements() {
        const userElements = document.querySelectorAll('.user-only');
        userElements.forEach(element => {
            element.style.display = 'inline-block';
        });
    }

    // Hide user-only elements
    hideUserElements() {
        const userElements = document.querySelectorAll('.user-only');
        userElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Check if user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'ADMIN';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// Initialize session manager with callback
const sessionManager = new SessionManager(function(user) {
    // Jika admin, biarkan showUserInfo yang handle tampilan
    if (user && user.role === 'ADMIN') {
        // Tidak perlu panggil showKamarList
        return;
    }
    // Jika user biasa atau belum login, tampilkan daftar kamar
    if (typeof showKamarList === 'function') {
        showKamarList();
    }
});

// Logout function
function logout() {
    sessionManager.clearSession();
}

// Show home function
function showHome() {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show hero and other main sections
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.fitur').style.display = 'block';
    document.querySelector('.kontak').style.display = 'block';
}

// Override existing functions to check authentication
function showPemesananList() {
    if (!sessionManager.isAdmin()) {
        alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
        return;
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show pemesanan list section
    const section = document.getElementById('pemesananList');
    section.style.display = 'block';
    loadPemesananList();
    // Scroll ke section
    if (section) window.scrollTo({ top: section.offsetTop - 60, behavior: 'smooth' });
}

// Check authentication before showing pemesanan form
function showPemesananForm() {
    if (!sessionManager.isLoggedIn()) {
        alert('Silakan login terlebih dahulu untuk melakukan pemesanan!');
        return;
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show pemesanan form section
    const section = document.getElementById('pemesananForm');
    section.style.display = 'block';
    loadKamarOptions();
    // Scroll ke section
    if (section) window.scrollTo({ top: section.offsetTop - 60, behavior: 'smooth' });
} 