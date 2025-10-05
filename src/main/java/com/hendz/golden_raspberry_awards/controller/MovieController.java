package com.hendz.golden_raspberry_awards.controller;

import com.hendz.golden_raspberry_awards.dto.ProducerIntervalResponseDTO;
import com.hendz.golden_raspberry_awards.service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/producers/intervals")
    public ResponseEntity<ProducerIntervalResponseDTO> getProducerIntervals() {
        ProducerIntervalResponseDTO response = movieService.getProducerIntervals();
        return ResponseEntity.ok(response);
    }
}
