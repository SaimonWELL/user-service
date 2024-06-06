import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    userId: number;

    @Column({ type: 'timestamp' })
    timestamp: Date;
}
