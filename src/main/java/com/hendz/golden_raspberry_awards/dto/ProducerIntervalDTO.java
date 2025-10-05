package com.hendz.golden_raspberry_awards.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProducerIntervalDTO {
    private String producer;
    private Integer interval;
    private Integer previousWin;
    private Integer followingWin;
}
