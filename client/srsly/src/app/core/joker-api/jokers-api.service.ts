import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Joke, Joker } from './jokers.model';

@Injectable({
  providedIn: 'root',
})
export class JokersApiService {
  constructor(private http: HttpClient) {}

  getAllJokers(): Observable<Joker[]> {
    return this.http.get<Joker[]>(`${environment.api}/jokers`);
  }

  addJoker(name: string) {
    return this.http.post<Joker>(`${environment.api}/jokers`, { name: name });
  }

  addJoke(idJoker: string, joke: Joke) {
    console.log(joke);
    return this.http.post<Joker>(`${environment.api}/jokers/${idJoker}/joke`, joke);
  }
}
