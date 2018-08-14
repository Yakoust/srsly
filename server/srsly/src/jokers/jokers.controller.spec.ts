import { JokersController } from './jokers.controller';
import { JokersService } from './jokers.service';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseModule } from '../database/database.module';
import { UpdateJokerDto } from './dto/update-joker.dto';
import { CreateJokerDto } from './dto/create-joker.dto';
import { JokeDto } from './dto/joke.dto';
import { jokersProviders } from './jokers.providers';

describe('CatsController', () => {
  let jokersController: JokersController;
  let jokersService: JokersService;

  beforeEach( async () => {

    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [JokersController],
      components: [JokersService, ...jokersProviders],
    }).compile();

    jokersService = module.get<JokersService>(JokersService);
    jokersController = module.get<JokersController>(JokersController);

  });

  it('should return an array of jokers', async () => {
      const result = ['test'];
      jest.spyOn(jokersController, 'findAll').mockImplementation(() => result);

      expect(await jokersController.findAll()).toBe(result);
    });

  it('should return a joker', async () => {
    const result = 'test';
    jest.spyOn(jokersController, 'findOne').mockImplementation(() => result);

    expect(await jokersController.findOne('id')).toBe(result);
  });

  it('should update a joker', async () => {
    const result = 'test';
    jest.spyOn(jokersController, 'update').mockImplementation(() => result);
    const joker: UpdateJokerDto = {
      name: 'jokerrr',
      jokes: [{joke: 'toto', context: 'in a bar', date: new Date()}],
    };
    expect(await jokersController.update('id', joker)).toBe(result);
  });

  it('should delete a joker', async () => {
    const result = 'test';
    jest.spyOn(jokersController, 'delete').mockImplementation(() => result);
    expect(await jokersController.delete('id')).toBe(result);
  });

  it('should create a joker', async () => {
    const result = 'test';
    jest.spyOn(jokersController, 'create').mockImplementation(() => result);
    const joker: CreateJokerDto = {
      name: 'jokerrr',
      jokes: [{joke: 'toto', context: 'in a bar', date: new Date()}],
    };
    expect(await jokersController.create(joker)).toBe(result);
  });

  it('should create a joke', async () => {
    const result = 'test';
    jest.spyOn(jokersController, 'createJoke').mockImplementation(() => result);
    const joke: JokeDto = {joke: 'toto', context: 'in a bar', date: new Date()};
    expect(await jokersController.createJoke('id', joke)).toBe(result);
  });
});