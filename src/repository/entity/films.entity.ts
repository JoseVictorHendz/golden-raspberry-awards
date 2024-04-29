import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Producer, } from './producers.entity';

@Entity("films")
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  winner: boolean;

  @ManyToMany(() => Producer, producer => producer.films, {
    cascade: true
  })
  @JoinTable({
    name: "films_producers",
    joinColumn: { name: "film_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "producer_id", referencedColumnName: "id" }
  })
  producers: Producer[];
}
