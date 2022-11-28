import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { PokemonType, PokemonDataType, PokemonList, PokemonListResult } from 'src/types/pokemon';

const pokemonTransformer = (pokemon: PokemonDataType[]) => {
  return pokemon.map((p) => {
    return {
      name: p.name,
      height: p.height,
      weight: p.weight,
      image: p.sprites.other['official-artwork'].front_default,
      stats: p.stats,
      types: p.types
    };
  });
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseURL: string = 'https://pokeapi.co/api/v2/pokemon/';
  page: number = 1;
  perPage: number = 18;

  private pageSubject = new Subject<number>();
  private nextPageURLSubject = new Subject<string | null>();
  private previousPageURLSubject = new Subject<string | null>();

  constructor(private http: HttpClient) {}

  get(name: string) {
    return this.http.get<PokemonDataType>(this.baseURL + name).pipe(
      map((pokemon) => pokemonTransformer([pokemon])),
      catchError(this.handleError),
    );
  }

  getAll() {
    const offset: number = (this.page - 1) * this.perPage;
    const pokemonList = this.http
      .get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.perPage}`)
      .pipe(
        mergeMap((pokemon: PokemonList) => {
          this.nextPageURLSubject.next(pokemon.next);
          this.previousPageURLSubject.next(pokemon.previous)

          const pokemonData = Promise.all(
            pokemon.results.map((pokemonLink: PokemonListResult) => {
              return fetch(pokemonLink.url)
                .then((response) => {
                  return response.json();
                })
                .then((pokemonArray: PokemonDataType) => {
                  return pokemonArray;
                });
            }),
          ).then((values) => {
            return pokemonTransformer(values);
          });

          return pokemonData;
        }),
        catchError(this.handleError),
      );
    return pokemonList;
  }

  pageChange(newPageNumber: number) {
    this.page += newPageNumber;
    this.pageSubject.next(this.page);
    return this.page;
  }

  get getPageChangeEvent$() {
    return this.pageSubject.asObservable();
  }

  get nextPageURLEvent$(){
    return this.nextPageURLSubject.asObservable();
  }

  get previousPageURLEvent$(){
    return this.previousPageURLSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => 'A data error occurred, cannot get pokemon');
  }
}
