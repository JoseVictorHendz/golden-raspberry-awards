import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Producer, } from './producers.entity';

@Entity("awards")
export class Award {
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

  @ManyToMany(() => Producer, producer => producer.awards, {
    cascade: true
  })
  @JoinTable({
    name: "awards_producers",
    joinColumn: { name: "award_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "producer_id", referencedColumnName: "id" }
  })
  producers: Producer[];
}
