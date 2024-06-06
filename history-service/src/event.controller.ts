import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    async create(@Body() event: Event) {
        return this.eventService.create(event);
    }

    @Get()
    async findAll(
        @Query('userId') userId: number,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.eventService.findAll(userId, page, limit);
    }
}