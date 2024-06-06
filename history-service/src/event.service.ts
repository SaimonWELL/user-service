import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

    async create(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
    }

    async findAll(userId: number, page: number, limit: number): Promise<Event[]> {
        return this.eventRepository.find({
            where: { userId },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
}
// node_bd
