package com.kosapp.controller;

import com.kosapp.model.Kamar;
import com.kosapp.repository.KamarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kamar")
public class KamarController {

    @Autowired
    private KamarRepository kamarRepository;

    @GetMapping
    public ResponseEntity<List<Kamar>> getAllKamar() {
        List<Kamar> kamarList = kamarRepository.findAll();
        return new ResponseEntity<>(kamarList, HttpStatus.OK);
    }

    @GetMapping("/tersedia")
    public ResponseEntity<List<Kamar>> getAvailableKamar() {
        List<Kamar> availableKamar = kamarRepository.findByTersedia(true);
        return new ResponseEntity<>(availableKamar, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kamar> getKamarById(@PathVariable Integer id) {
        Optional<Kamar> kamar = kamarRepository.findById(id);
        return kamar.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Kamar> addKamar(@RequestBody Kamar kamar) {
        Kamar newKamar = kamarRepository.save(kamar);
        return new ResponseEntity<>(newKamar, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kamar> updateKamar(@PathVariable Integer id, @RequestBody Kamar kamarDetails) {
        Optional<Kamar> kamar = kamarRepository.findById(id);
        if (kamar.isPresent()) {
            Kamar existingKamar = kamar.get();
            existingKamar.setNomorKamar(kamarDetails.getNomorKamar());
            existingKamar.setTipe(kamarDetails.getTipe());
            existingKamar.setHarga(kamarDetails.getHarga());
            existingKamar.setTersedia(kamarDetails.isTersedia());
            existingKamar.setFasilitas(kamarDetails.getFasilitas());
            existingKamar.setDeskripsi(kamarDetails.getDeskripsi());
            Kamar updatedKamar = kamarRepository.save(existingKamar);
            return new ResponseEntity<>(updatedKamar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteKamar(@PathVariable Integer id) {
        try {
            kamarRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 