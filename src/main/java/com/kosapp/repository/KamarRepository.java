package com.kosapp.repository;

import com.kosapp.model.Kamar;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KamarRepository extends JpaRepository<Kamar, Integer> {
    List<Kamar> findByTersedia(boolean tersedia);
} 