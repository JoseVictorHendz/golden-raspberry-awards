package com.hendz.golden_raspberry_awards.service;


import com.hendz.golden_raspberry_awards.dto.ProducerIntervalDTO;
import com.hendz.golden_raspberry_awards.dto.ProducerIntervalResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService {

    public ProducerIntervalResponseDTO getProducerIntervals() {

        ProducerIntervalResponseDTO resp = new ProducerIntervalResponseDTO(
                List.of(
                        new ProducerIntervalDTO("Produtor A", 10, 1984, 1994)
                ),
                List.of(
                        new ProducerIntervalDTO("Produtor B", 20, 1990, 2010)
                )
        );
        return resp;    }
}