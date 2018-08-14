import {Controller, Get, Post, Body, Param, Delete, Patch} from '@nestjs/common';
import { CreateJokerDto } from './dto/create-joker.dto';
import { JokersService } from './jokers.service';
import { Joker } from './interfaces/joker.interface';
import {ApiOperation, ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {UpdateJokerDto} from "./dto/update-joker.dto";
import {JokeDto} from "./dto/joke.dto";

@ApiUseTags('jokers')
@Controller('jokers')
export class JokersController {
    constructor(private readonly jokersService: JokersService) {}

    @Post()
    @ApiOperation({ title: 'Create a joker' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    public async create(@Body() createJokerDto: CreateJokerDto) {
        this.jokersService.create(createJokerDto);
    }

    @Post('/:id/joke')
    @ApiOperation({ title: 'Create a joke' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    public async createJoke(@Param('id') id: string, @Body() jokeDto: JokeDto) {
        this.jokersService.createJoke(id, jokeDto);
    }

    @Get()
    @ApiOperation({ title: 'Get all jokers' })
    public async findAll(): Promise<Joker[]> {
        return this.jokersService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ title: 'Get a joker by id' })
    public async findOne(@Param('id') id: string): Promise<Joker> {
        return this.jokersService.findById(id);
    }

    @Patch('/:id')
    @ApiOperation({ title: 'Update a joker' })
    public async update(@Param('id') id: string, @Body() updateJokerDto: UpdateJokerDto): Promise<Joker> {
        return this.jokersService.update(id, updateJokerDto);
    }

    @Delete('/:id')
    @ApiOperation({ title: 'Delete a joker by id' })
    public async delete(@Param('id') id: string): Promise<string> {
        return this.jokersService.delete(id);
    }
}