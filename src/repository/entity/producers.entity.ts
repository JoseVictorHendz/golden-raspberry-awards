import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Award } from "./awards.entity";

@Entity("producers")
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  name: string;

  @ManyToMany(() => Award, award => award.producers)
  @JoinTable({
    name: "awards_producers",
    joinColumn: { name: "producer_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "award_id", referencedColumnName: "id" }
  })
  awards: Award[];
}