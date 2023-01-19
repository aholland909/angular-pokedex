import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, mergeMap, tap, shareReplay, share, switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { PokemonType, PokemonDataType, PokemonList, PokemonListResult } from 'src/types/pokemon';

const pokemonTransformer = (pokemon: PokemonDataType) => {
  return {
    id: pokemon.id,
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

  private pageSubject = new ReplaySubject<number>();
  private nextPageURLSubject = new ReplaySubject<string | null>();
  private previousPageURLSubject = new ReplaySubject<string | null>();
  public pokemonListData$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // get a single pokemon
  get(name: string) {
    return this.http.get<PokemonDataType>(this.baseURL + name).pipe(
      map((pokemon) => pokemonTransformer(pokemon)),
      catchError(this.handleError),
    );
  }
  // get list of pokemon old function
  getPokemonList() {
    const offset: number = (this.page - 1) * this.perPage;
    return this.http.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${this.perPage}`).pipe(
      tap((pokemon: PokemonList) => this.updatePaginationSubject(pokemon.previous, pokemon.next)),
      map((pokemonList) => pokemonList.results),
    );
  }

  // cache a list of pokemon
  public getCachedPokemonList$ = this.pokemonListData$.pipe(
    mergeMap(() => this.getPokemonList()),
    shareReplay(1),
  );

  // cached get additional data for pokemon
  public getPagedPokemon$ = this.pokemonListData$.pipe(
    mergeMap(() =>
      this.getPokemonList().pipe(
        mergeMap((pokemonList) => forkJoin(pokemonList.map((pokemon) => this.get(pokemon.name)))),
      ),
    ),
    shareReplay(1),
  );

  updatePaginationSubject = (previous: string, next: string) => {
    this.nextPageURLSubject.next(next);
    this.previousPageURLSubject.next(previous);
  };

  // pageChanged event
  pageChange(newPageNumber: number) {
    this.page += newPageNumber;
    this.pageSubject.next(this.page);
    this.pokemonListData$.next();
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
