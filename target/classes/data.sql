-- Insert sample kamar data (ignore if already exists)
INSERT IGNORE INTO kamar (nomor_kamar, tipe, harga, tersedia, fasilitas, deskripsi) VALUES
('A1', 'Standard', 1500000.00, true, 'AC, Kamar Mandi Dalam, WiFi', 'Kamar standard dengan fasilitas lengkap'),
('A2', 'Standard', 1500000.00, true, 'AC, Kamar Mandi Dalam, WiFi', 'Kamar standard dengan fasilitas lengkap'),
('A3', 'Standard', 1500000.00, false, 'AC, Kamar Mandi Dalam, WiFi', 'Kamar standard dengan fasilitas lengkap'),
('B1', 'Premium', 2000000.00, true, 'AC, Kamar Mandi Dalam, WiFi, TV, Kulkas', 'Kamar premium dengan fasilitas mewah'),
('B2', 'Premium', 2000000.00, true, 'AC, Kamar Mandi Dalam, WiFi, TV, Kulkas', 'Kamar premium dengan fasilitas mewah'),
('B3', 'Premium', 2000000.00, false, 'AC, Kamar Mandi Dalam, WiFi, TV, Kulkas', 'Kamar premium dengan fasilitas mewah'),
('C1', 'VIP', 2500000.00, true, 'AC, Kamar Mandi Dalam, WiFi, TV, Kulkas, Balkon', 'Kamar VIP dengan view terbaik'),
('C2', 'VIP', 2500000.00, true, 'AC, Kamar Mandi Dalam, WiFi, TV, Kulkas, Balkon', 'Kamar VIP dengan view terbaik');

-- Insert sample pemesanan data (ignore if already exists)
INSERT IGNORE INTO pemesanan (kamar_id, nama_pemesan, email, no_telepon, tanggal_masuk, tanggal_keluar, status, tanggal_pemesanan) VALUES
(3, 'Ahmad Rizki', 'ahmad.rizki@email.com', '081234567890', '2024-01-15', '2024-12-15', 'Dikonfirmasi', '2024-01-10'),
(6, 'Siti Nurhaliza', 'siti.nurhaliza@email.com', '081234567891', '2024-02-01', '2024-12-01', 'Menunggu Konfirmasi', '2024-01-25'),
(3, 'Budi Santoso', 'budi.santoso@email.com', '081234567892', '2024-01-20', '2024-12-20', 'Dikonfirmasi', '2024-01-15'); 