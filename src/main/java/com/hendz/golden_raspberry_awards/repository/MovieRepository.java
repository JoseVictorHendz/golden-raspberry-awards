package com.hendz.golden_raspberry_awards.repository;

import com.hendz.golden_raspberry_awards.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}