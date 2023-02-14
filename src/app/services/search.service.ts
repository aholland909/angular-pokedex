import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { PokemonList } from 'src/types/pokemon';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public useStore$ = new BehaviorSubject<boolean>(false);

  localStorageReplay() {
    const storedValue$ = of(localStorage.getItem(`pokemonList`)).pipe(
      map((str) => (str === 'undefined' ? undefined : JSON.parse(str || ''))),
    );

    return this.useStore$.pipe(
      switchMap((useStore: any) => (useStore ? storedValue$ : this.allPokemon$)),
      shareReplay(1),
    );
  }

  // get all pokemon
  allPokemon$ = this.http.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279').pipe(
    tap((pokemon: any) => localStorage.setItem('pokemonList', JSON.stringify(pokemon.results))),
    map(pokemon => pokemon.results),
    catchError(this.handleError),
  );

  private handleError(error: any) {
    console.error(error.message);
    return throwError(() => 'A data error occurred, cannot get pokemon');
  }
}
