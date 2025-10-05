package com.hendz.golden_raspberry_awards.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProducerIntervalResponseDTO {
    private List<ProducerIntervalDTO> min;
    private List<ProducerIntervalDTO> max;
}
