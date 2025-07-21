package com.kosapp.repository;

import com.kosapp.model.Pemesanan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PemesananRepository extends JpaRepository<Pemesanan, Integer> {
    List<Pemesanan> findByStatus(String status);
} 