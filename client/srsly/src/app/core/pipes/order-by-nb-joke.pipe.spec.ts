import { OrderByNbJokePipe } from './order-by-nb-joke.pipe';

describe('OrderByNbJokePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByNbJokePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return same array if both joke list are null', () => {
    const pipe = new OrderByNbJokePipe();
    expect(pipe.transform([{ name: 'toto', _id: '1' }, { name: 'titi', _id: '2' }])).toEqual([
      { name: 'toto', _id: '1' },
      { name: 'titi', _id: '2' },
    ]);
  });

  it('should return array with the one with a list not null first', () => {
    const pipe = new OrderByNbJokePipe();
    expect(pipe.transform([{ name: 'toto', _id: '1' }, { name: 'titi', _id: '2', jokes: [] }])).toEqual([
      { name: 'titi', _id: '2', jokes: [] },
      { name: 'toto', _id: '1' },
    ]);
    expect(pipe.transform([{ name: 'titi', _id: '2', jokes: [] }, { name: 'toto', _id: '1' }])).toEqual([
      { name: 'titi', _id: '2', jokes: [] },
      { name: 'toto', _id: '1' },
    ]);
  });

  it('should return array with the one with more element in list first', () => {
    const pipe = new OrderByNbJokePipe();
    const date = new Date();
    expect(
      pipe.transform([
        {
          name: 'toto',
          _id: '1',
          jokes: [{ joke: 'toto', context: 'la', date: date }],
        },
        {
          name: 'titi',
          _id: '2',
          jokes: [{ joke: 'toto', context: 'la', date: date }, { joke: 'toto', context: 'la', date: date }],
        },
      ])
    ).toEqual([
      {
        name: 'titi',
        _id: '2',
        jokes: [{ joke: 'toto', context: 'la', date: date }, { joke: 'toto', context: 'la', date: date }],
      },
      {
        name: 'toto',
        _id: '1',
        jokes: [{ joke: 'toto', context: 'la', date: date }],
      },
    ]);

    expect(
      pipe.transform([
        {
          name: 'titi',
          _id: '2',
          jokes: [{ joke: 'toto', context: 'la', date: date }, { joke: 'toto', context: 'la', date: date }],
        },
        {
          name: 'toto',
          _id: '1',
          jokes: [{ joke: 'toto', context: 'la', date: date }],
        },
      ])
    ).toEqual([
      {
        name: 'titi',
        _id: '2',
        jokes: [{ joke: 'toto', context: 'la', date: date }, { joke: 'toto', context: 'la', date: date }],
      },
      {
        name: 'toto',
        _id: '1',
        jokes: [{ joke: 'toto', context: 'la', date: date }],
      },
    ]);
  });

  it('should return same array if same number of jokes', () => {
    const pipe = new OrderByNbJokePipe();
    const date = new Date();
    expect(
      pipe.transform([
        {
          name: 'titi',
          _id: '2',
          jokes: [{ joke: 'toto', context: 'la', date: date }],
        },
        {
          name: 'toto',
          _id: '1',
          jokes: [{ joke: 'toto', context: 'la', date: date }],
        },
      ])
    ).toEqual([
      {
        name: 'titi',
        _id: '2',
        jokes: [{ joke: 'toto', context: 'la', date: date }],
      },
      {
        name: 'toto',
        _id: '1',
        jokes: [{ joke: 'toto', context: 'la', date: date }],
      },
    ]);
  });
});
