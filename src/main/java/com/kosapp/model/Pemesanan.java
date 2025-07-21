package com.kosapp.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pemesanan")
public class Pemesanan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "kamar_id", nullable = false)
    private int kamarId;

    @Column(name = "nama_pemesan", nullable = false, length = 100)
    private String namaPemesan;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "no_telepon", nullable = false, length = 20)
    private String noTelepon;

    @Column(name = "tanggal_masuk", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date tanggalMasuk;

    @Column(name = "tanggal_keluar", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date tanggalKeluar;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "tanggal_pemesanan", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date tanggalPemesanan;

    // Constructors
    public Pemesanan() {}

    public Pemesanan(int id, int kamarId, String namaPemesan, String email, String noTelepon,
                    Date tanggalMasuk, Date tanggalKeluar, String status, Date tanggalPemesanan) {
        this.id = id;
        this.kamarId = kamarId;
        this.namaPemesan = namaPemesan;
        this.email = email;
        this.noTelepon = noTelepon;
        this.tanggalMasuk = tanggalMasuk;
        this.tanggalKeluar = tanggalKeluar;
        this.status = status;
        this.tanggalPemesanan = tanggalPemesanan;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getKamarId() {
        return kamarId;
    }

    public void setKamarId(int kamarId) {
        this.kamarId = kamarId;
    }

    public String getNamaPemesan() {
        return namaPemesan;
    }

    public void setNamaPemesan(String namaPemesan) {
        this.namaPemesan = namaPemesan;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNoTelepon() {
        return noTelepon;
    }

    public void setNoTelepon(String noTelepon) {
        this.noTelepon = noTelepon;
    }

    public Date getTanggalMasuk() {
        return tanggalMasuk;
    }

    public void setTanggalMasuk(Date tanggalMasuk) {
        this.tanggalMasuk = tanggalMasuk;
    }

    public Date getTanggalKeluar() {
        return tanggalKeluar;
    }

    public void setTanggalKeluar(Date tanggalKeluar) {
        this.tanggalKeluar = tanggalKeluar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getTanggalPemesanan() {
        return tanggalPemesanan;
    }

    public void setTanggalPemesanan(Date tanggalPemesanan) {
        this.tanggalPemesanan = tanggalPemesanan;
    }
} 