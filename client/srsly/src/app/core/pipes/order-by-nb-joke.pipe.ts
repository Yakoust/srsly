import { Pipe, PipeTransform } from '@angular/core';
import { Joker} from '../joker-api/jokers.model';

@Pipe({
  name: 'orderByNbJoke'
})
export class OrderByNbJokePipe implements PipeTransform {

  transform(value: Joker[], args?: any): any {
    return Array.from(value).sort((a: Joker, b: Joker) => {
      if (!a.jokes && !b.jokes) {
        return 0;
      }
      if ( !a.jokes && b.jokes) {
        return 1;
      }  if ( a.jokes && !b.jokes) {
        return -1;
      } if (a.jokes.length < b.jokes.length) {
        return 1;
      } if ( a.jokes > b.jokes ) {
        return -1;
      }
      return 0;
    } );
  }

}
