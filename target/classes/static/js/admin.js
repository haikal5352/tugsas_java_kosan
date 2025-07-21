// Cek role admin, jika bukan admin redirect ke index.html
const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (!user || user.role !== 'ADMIN') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan nama admin
    document.getElementById('adminName').textContent = `Selamat datang, ${user.username}!`;
    loadPemesananList();
});

const API_URL = {
    PEMESANAN: '/api/pemesanan'
};

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
        const STATUS_OPTIONS = ['PENDING','DIKONFIRMASI','CANCELLED','MENUNGGU KONFIRMASI','DIBATALKAN'];
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
        document.querySelectorAll('.update-status-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = this.getAttribute('data-id');
                const select = document.querySelector(`.status-select[data-id='${id}']`);
                const newStatus = select.value;
                await updatePemesananStatus(id, newStatus);
            });
        });
    } catch (error) {
        const tbody = document.getElementById('pemesananListContent');
        if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading pemesanan list.</td></tr>';
    }
}

async function updatePemesananStatus(id, newStatus) {
    try {
        const getRes = await fetch(`${API_URL.PEMESANAN}/${id}`);
        if (!getRes.ok) return alert('Gagal ambil data pemesanan');
        const pemesanan = await getRes.json();
        pemesanan.status = newStatus;
        const res = await fetch(`${API_URL.PEMESANAN}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pemesanan)
        });
        if (res.ok) {
            alert('Status berhasil diupdate!');
            loadPemesananList();
        } else {
            alert('Gagal update status');
        }
    } catch (err) {
        alert('Error update status');
    }
}

async function deletePemesanan(id) {
    if (!confirm('Yakin ingin menghapus pemesanan ini?')) return;
    try {
        const res = await fetch(`${API_URL.PEMESANAN}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            alert('Pemesanan berhasil dihapus!');
            loadPemesananList();
        } else {
            alert('Gagal menghapus pemesanan');
        }
    } catch (err) {
        alert('Error menghapus pemesanan');
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('id-ID');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
} 