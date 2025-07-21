package com.kosapp.model;

import javax.persistence.*;

@Entity
@Table(name = "kamar")
public class Kamar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nomor_kamar", unique = true, nullable = false, length = 10)
    private String nomorKamar;

    @Column(name = "tipe", nullable = false, length = 50)
    private String tipe;

    @Column(name = "harga", nullable = false, precision = 10, scale = 2)
    private double harga;

    @Column(name = "tersedia")
    private boolean tersedia;

    @Column(name = "fasilitas", columnDefinition = "TEXT")
    private String fasilitas;

    @Column(name = "deskripsi", columnDefinition = "TEXT")
    private String deskripsi;

    // Constructors
    public Kamar() {}

    public Kamar(int id, String nomorKamar, String tipe, double harga, boolean tersedia, String fasilitas, String deskripsi) {
        this.id = id;
        this.nomorKamar = nomorKamar;
        this.tipe = tipe;
        this.harga = harga;
        this.tersedia = tersedia;
        this.fasilitas = fasilitas;
        this.deskripsi = deskripsi;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomorKamar() {
        return nomorKamar;
    }

    public void setNomorKamar(String nomorKamar) {
        this.nomorKamar = nomorKamar;
    }

    public String getTipe() {
        return tipe;
    }

    public void setTipe(String tipe) {
        this.tipe = tipe;
    }

    public double getHarga() {
        return harga;
    }

    public void setHarga(double harga) {
        this.harga = harga;
    }

    public boolean isTersedia() {
        return tersedia;
    }

    public void setTersedia(boolean tersedia) {
        this.tersedia = tersedia;
    }

    public String getFasilitas() {
        return fasilitas;
    }

    public void setFasilitas(String fasilitas) {
        this.fasilitas = fasilitas;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }
} 