-- Create kamar table
CREATE TABLE IF NOT EXISTS kamar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_kamar VARCHAR(10) NOT NULL UNIQUE,
    tipe VARCHAR(50) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    tersedia BOOLEAN DEFAULT true,
    fasilitas TEXT,
    deskripsi TEXT
);

-- Create pemesanan table
CREATE TABLE IF NOT EXISTS pemesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kamar_id INT NOT NULL,
    nama_pemesan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    no_telepon VARCHAR(20) NOT NULL,
    tanggal_masuk DATE NOT NULL,
    tanggal_keluar DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    tanggal_pemesanan DATE NOT NULL,
    FOREIGN KEY (kamar_id) REFERENCES kamar(id)
);

-- Create user table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Admin default (buat manual di database)
-- INSERT INTO user (username, email, password, role) VALUES ('admin', 'admin@email.com', 'admin123', 'ADMIN'); 