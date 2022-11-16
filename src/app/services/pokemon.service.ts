import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PokemonType, PokemonDataType, PokemonList, PokemonListResult } from 'src/types/pokemon';

const pokemonTransformer = (pokemon: PokemonDataType[]) => {
  return pokemon.map(p => {
    return {
      name: p.name,
      height: p.height,
      weight: p.weight,
      image: p.sprites.other['official-artwork'].front_default,
    }
  })
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseURL: string = 'https://pokeapi.co/api/v2/pokemon/';
  page: number = 1;
  perPage: number = 18;
  nextPage: string | null = null;
  previousPage: string | null = null;

  constructor(private http: HttpClient) {}

  get(name: string) {
    return this.http
      .get<PokemonDataType>(this.baseURL + name)
      .pipe(map( pokemon => pokemonTransformer([pokemon])), catchError(this.handleError));
  }

  getAll () {
    const offset: number = (this.page - 1) * this.perPage;
    const pokemonList = this.http
      .get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.perPage}`)
      .pipe(
        mergeMap((pokemon: PokemonList) => {
          this.nextPage = pokemon.next;
          this.previousPage = pokemon.previous;

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

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => 'A data error occurred, please try again.');
  }
}
