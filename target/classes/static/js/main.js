// API endpoints
const API_URL = {
    KAMAR: '/api/kamar',
    KAMAR_TERSEDIA: '/api/kamar/tersedia',
    PEMESANAN: '/api/pemesanan'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showKamarList();
});

// Show/hide sections
function showKamarList() {
    const kamarList = document.getElementById('kamarList');
    const pemesananForm = document.getElementById('pemesananForm');
    const pemesananList = document.getElementById('pemesananList');
    if (kamarList) kamarList.style.display = 'block';
    if (pemesananForm) pemesananForm.style.display = 'none';
    if (pemesananList) pemesananList.style.display = 'none';
    loadKamarList();
    if (kamarList) window.scrollTo({ top: kamarList.offsetTop - 60, behavior: 'smooth' });
}

// Note: showPemesananForm and showPemesananList are now handled in session.js
// with authentication checks

// Load available rooms
async function loadKamarList() {
    try {
        const response = await fetch(API_URL.KAMAR_TERSEDIA);
        const kamarList = await response.json();
        console.log('Data kamar dari API:', kamarList); // DEBUG LOG
        const container = document.getElementById('kamarListContent');
        if (!container) return;
        if (kamarList.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-center">Tidak ada kamar tersedia saat ini.</p></div>';
            return;
        }
        container.innerHTML = kamarList.map(kamar => createKamarCard(kamar)).join('');
        // Perbaiki visibilitas tombol user-only setelah render
        if (window.sessionManager) {
            const user = window.sessionManager.getCurrentUser();
            if (user && user.role === 'ADMIN') {
                window.sessionManager.hideUserElements();
            } else {
                window.sessionManager.showUserElements();
            }
        }
    } catch (error) {
        console.error('Error loading kamar list:', error);
        const container = document.getElementById('kamarListContent');
        if (container) container.innerHTML = '<div class="col-12"><p class="text-center text-danger">Error loading kamar list.</p></div>';
    }
}

function createKamarCard(kamar) {
    const statusClass = kamar.tersedia ? 'text-success' : 'text-danger';
    const statusText = kamar.tersedia ? 'Tersedia' : 'Tidak Tersedia';
    let isUser = true;
    let adminHideClass = '';
    if (window.sessionManager) {
        const user = window.sessionManager.getCurrentUser();
        if (user && user.role === 'ADMIN') {
            isUser = false;
            adminHideClass = 'admin-hide';
        }
    }
    return `
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Kamar ${kamar.nomorKamar}</h5>
                    <p class="card-text"><strong>Tipe:</strong> ${kamar.tipe}</p>
                    <p class="card-text"><strong>Harga:</strong> Rp ${kamar.harga.toLocaleString()}/bulan</p>
                    <p class="card-text"><strong>Deskripsi:</strong> ${kamar.deskripsi}</p>
                    <p class="card-text"><strong>Fasilitas:</strong> ${kamar.fasilitas}</p>
                    <p class="card-text"><strong>Status:</strong> <span class="${statusClass}">${statusText}</span></p>
                    ${kamar.tersedia && isUser ? `<button class="btn btn-primary user-only ${adminHideClass}" onclick="bookKamar(${kamar.id})">Pesan Sekarang</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Book kamar
function bookKamar(kamarId) {
    showPemesananForm();
    const kamarIdInput = document.getElementById('kamarId');
    if (kamarIdInput) kamarIdInput.value = kamarId;
}

// Load kamar options for booking form
async function loadKamarOptions() {
    try {
        const response = await fetch(API_URL.KAMAR_TERSEDIA);
        const kamarList = await response.json();
        const select = document.getElementById('kamarId');
        if (!select) return;
        select.innerHTML = '<option value="">Pilih Kamar</option>';
        kamarList.forEach(kamar => {
            select.innerHTML += `<option value="${kamar.id}">Kamar ${kamar.nomorKamar} - ${kamar.tipe} (Rp ${kamar.harga.toLocaleString()})</option>`;
        });
    } catch (error) {
        console.error('Error loading kamar options:', error);
    }
}

// Handle booking form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        // HTML5 validation
        if (!bookingForm.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            bookingForm.classList.add('was-validated');
            return;
        }
        bookingForm.classList.add('was-validated');
        // Lanjutkan submit AJAX jika valid
        e.preventDefault();
        const formData = {
            namaPemesan: document.getElementById('namaPemesan').value,
            email: document.getElementById('email').value,
            noTelepon: document.getElementById('noTelepon').value,
            kamarId: document.getElementById('kamarId').value,
            tanggalMasuk: document.getElementById('tanggalMasuk').value,
            tanggalKeluar: document.getElementById('tanggalKeluar').value
        };
        try {
            const response = await fetch(API_URL.PEMESANAN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Pemesanan berhasil dibuat!');
                this.reset();
                showKamarList();
            } else {
                alert('Error creating pemesanan');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating pemesanan');
        }
    }, false);
}

// Status options
const DEFAULT_STATUS_OPTIONS = [
    'PENDING',
    'DIKONFIRMASI',
    'CANCELLED',
    'MENUNGGU KONFIRMASI',
    'DIKONFIRMASI',
    'DIBATALKAN'
];

// Load pemesanan list
async function loadPemesananList() {
    try {
        const response = await fetch(API_URL.PEMESANAN);
        const pemesananList = await response.json();
        const tbody = document.getElementById('pemesananListContent');
        if (!tbody) return;
        if (pemesananList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada pemesanan.</td></tr>';
            return;
        }
        // Ambil semua status unik dari data
        const dataStatus = Array.from(new Set(pemesananList.map(p => (p.status || '').toUpperCase())));
        // Gabungkan dengan default
        const STATUS_OPTIONS = Array.from(new Set([...DEFAULT_STATUS_OPTIONS, ...dataStatus]));
        tbody.innerHTML = pemesananList.map(pemesanan => `
            <tr>
                <td>${pemesanan.id}</td>
                <td>${pemesanan.namaPemesan}</td>
                <td>Kamar ${pemesanan.kamarId}</td>
                <td>${formatDate(pemesanan.tanggalMasuk)}</td>
                <td>${formatDate(pemesanan.tanggalKeluar)}</td>
                <td>
                    <select class="form-select form-select-sm status-select" data-id="${pemesanan.id}">
                        ${STATUS_OPTIONS.map(opt => `<option value="${opt}" ${opt === (pemesanan.status || '').toUpperCase() ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <button class="btn btn-primary btn-sm update-status-btn" data-id="${pemesanan.id}">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePemesanan(${pemesanan.id})">Hapus</button>
                </td>
            </tr>
        `).join('');

        // Tambahkan event listener untuk tombol update status
        document.querySelectorAll('.update-status-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = this.getAttribute('data-id');
                const select = document.querySelector(`.status-select[data-id='${id}']`);
                const newStatus = select.value;
                await updatePemesananStatus(id, newStatus);
            });
        });
    } catch (error) {
        console.error('Error loading pemesanan list:', error);
        const tbody = document.getElementById('pemesananListContent');
        if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading pemesanan list.</td></tr>';
    }
}

// Update status pemesanan
async function updatePemesananStatus(id, newStatus) {
    try {
        // Ambil data lama
        const getRes = await fetch(`${API_URL.PEMESANAN}/${id}`);
        if (!getRes.ok) {
            alert('Gagal mengambil data pemesanan');
            return;
        }
        const oldData = await getRes.json();
        // Update status saja
        oldData.status = newStatus;
        const response = await fetch(`${API_URL.PEMESANAN}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(oldData)
        });
        if (response.ok) {
            alert('Status berhasil diupdate!');
            loadPemesananList();
        } else {
            alert('Gagal update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating status');
    }
}

// Delete pemesanan
async function deletePemesanan(id) {
    if (confirm('Apakah Anda yakin ingin menghapus pemesanan ini?')) {
        try {
            const response = await fetch(`${API_URL.PEMESANAN}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Pemesanan berhasil dihapus!');
                loadPemesananList();
            } else {
                alert('Error deleting pemesanan');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting pemesanan');
        }
    }
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID');
} 