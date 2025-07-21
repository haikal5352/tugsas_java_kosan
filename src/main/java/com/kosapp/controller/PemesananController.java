package com.kosapp.controller;

import com.kosapp.model.Pemesanan;
import com.kosapp.model.Kamar;
import com.kosapp.repository.PemesananRepository;
import com.kosapp.repository.KamarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pemesanan")
public class PemesananController {

    @Autowired
    private PemesananRepository pemesananRepository;

    @Autowired
    private KamarRepository kamarRepository;

    @GetMapping
    public ResponseEntity<List<Pemesanan>> getAllPemesanan() {
        List<Pemesanan> pemesananList = pemesananRepository.findAll();
        return new ResponseEntity<>(pemesananList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pemesanan> getPemesananById(@PathVariable Integer id) {
        Optional<Pemesanan> pemesanan = pemesananRepository.findById(id);
        return pemesanan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Pemesanan> addPemesanan(@RequestBody Pemesanan pemesanan) {
        try {
            if (pemesanan.getTanggalPemesanan() == null) {
                pemesanan.setTanggalPemesanan(new Date());
            }
            if (pemesanan.getStatus() == null || pemesanan.getStatus().isEmpty()) {
                pemesanan.setStatus("PENDING");
            }
            Pemesanan newPemesanan = pemesananRepository.save(pemesanan);
            Optional<Kamar> kamarOptional = kamarRepository.findById(pemesanan.getKamarId());
            if (kamarOptional.isPresent()) {
                Kamar kamar = kamarOptional.get();
                kamar.setTersedia(false);
                kamarRepository.save(kamar);
            }
            return new ResponseEntity<>(newPemesanan, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pemesanan> updatePemesanan(@PathVariable Integer id, @RequestBody Pemesanan pemesananDetails) {
        Optional<Pemesanan> pemesanan = pemesananRepository.findById(id);
        if (pemesanan.isPresent()) {
            Pemesanan existingPemesanan = pemesanan.get();
            if (pemesananDetails.getStatus() != null &&
                pemesananDetails.getKamarId() == 0 &&
                pemesananDetails.getNamaPemesan() == null &&
                pemesananDetails.getEmail() == null &&
                pemesananDetails.getNoTelepon() == null &&
                pemesananDetails.getTanggalMasuk() == null &&
                pemesananDetails.getTanggalKeluar() == null) {
                existingPemesanan.setStatus(pemesananDetails.getStatus());
            } else {
                existingPemesanan.setKamarId(pemesananDetails.getKamarId());
                existingPemesanan.setNamaPemesan(pemesananDetails.getNamaPemesan());
                existingPemesanan.setEmail(pemesananDetails.getEmail());
                existingPemesanan.setNoTelepon(pemesananDetails.getNoTelepon());
                existingPemesanan.setTanggalMasuk(pemesananDetails.getTanggalMasuk());
                existingPemesanan.setTanggalKeluar(pemesananDetails.getTanggalKeluar());
                existingPemesanan.setStatus(pemesananDetails.getStatus());
            }
            Pemesanan updatedPemesanan = pemesananRepository.save(existingPemesanan);
            return new ResponseEntity<>(updatedPemesanan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePemesanan(@PathVariable Integer id) {
        try {
            Optional<Pemesanan> pemesananOptional = pemesananRepository.findById(id);
            if (pemesananOptional.isPresent()) {
                Pemesanan pemesanan = pemesananOptional.get();
                pemesananRepository.deleteById(id);
                Optional<Kamar> kamarOptional = kamarRepository.findById(pemesanan.getKamarId());
                if (kamarOptional.isPresent()) {
                    Kamar kamar = kamarOptional.get();
                    kamar.setTersedia(true);
                    kamarRepository.save(kamar);
                }
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 