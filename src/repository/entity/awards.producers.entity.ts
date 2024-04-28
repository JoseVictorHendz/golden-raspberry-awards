import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Producer, } from './producers.entity';
import { Award } from './awards.entity';

Entity("awards_producers")
export class AwardProducer {

  @ManyToOne(() => Award, (award) => award)
  awardId: number;

  @ManyToOne(() => Producer, (producer) => producer)
  producerId: Producer;
}