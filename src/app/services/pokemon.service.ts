import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { forkJoin, Subject, throwError } from 'rxjs';
import { PokemonType, PokemonDataType, PokemonList, PokemonListResult } from 'src/types/pokemon';

const pokemonTransformer = (pokemon: PokemonDataType) => {
  return {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    image: pokemon.sprites.other['official-artwork'].front_default,
    stats: pokemon.stats,
    types: pokemon.types,
  };
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

  // get a single pokemon
  get(name: string) {
    return this.http.get<PokemonDataType>(this.baseURL + name).pipe(
      map((pokemon) => pokemonTransformer(pokemon)),
      catchError(this.handleError),
    );
  }
  // get list of pokemon
  getPokemonList() {
    const offset: number = (this.page - 1) * this.perPage;
    return this.http.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.perPage}`).pipe(
      tap((pokemon: PokemonList) => this.updatePaginationSubject(pokemon.previous, pokemon.next)),
      map((pokemonList) => pokemonList.results),
    );
  }
  // get additional data for pokemon
  getPagedPokemon() {
    return this.getPokemonList().pipe(
      mergeMap((pokemonList) => forkJoin(pokemonList.map((pokemon) => this.get(pokemon.name)))),
    );
  }

  updatePaginationSubject = (previous: string, next: string) => {
    this.nextPageURLSubject.next(next);
    this.previousPageURLSubject.next(previous);
  }

  pageChange(newPageNumber: number) {
    this.page += newPageNumber;
    this.pageSubject.next(this.page);
    return this.page;
  }

  get getPageChangeEvent$() {
    return this.pageSubject.asObservable();
  }

  get nextPageURLEvent$() {
    return this.nextPageURLSubject.asObservable();
  }

  get previousPageURLEvent$() {
    return this.previousPageURLSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => 'A data error occurred, cannot get pokemon');
  }
}
