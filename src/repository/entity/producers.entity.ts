import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Film } from "./films.entity";

@Entity("producers")
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  name: string;

  @ManyToMany(() => Film, film => film.producers)
  @JoinTable({
    name: "films_producers",
    joinColumn: { name: "producer_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "film_id", referencedColumnName: "id" }
  })
  films: Film[];
}