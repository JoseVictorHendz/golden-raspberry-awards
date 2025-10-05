package com.hendz.golden_raspberry_awards.Entity;

import jakarta.persistence.*;
import lombok.*;
//year;title;studios;producers;winner
@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "year_award")
    private Integer year;

    @Column(name = "title")
    private String title;

    @Column(name = "studios")
    private String studios;

    @Column(name = "producers")
    private String producers;

    @Column(name = "winner")
    private Boolean winner;

    public Movie(Integer year, String title, String studios, String producers, Boolean winner) {
        this.year = year;
        this.title = title;
        this.studios = studios;
        this.producers = producers;
        this.winner = winner;
    }
}
