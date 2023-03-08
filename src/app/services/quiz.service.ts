import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PokemonService } from "./pokemon.service";
import { Observable, catchError, map, mergeMap, throwError } from "rxjs";
import { PokemonDataType, PokemonList, PokemonListResult, PokemonType } from "src/types/pokemon";

@Injectable({
  providedIn: 'root'
})
export class Quiz {
  
  constructor(private http: HttpClient, private pokemonService: PokemonService) {}

  getRandomPokemon(randomIndex: string):Observable<PokemonType> {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/?offset=${randomIndex}&limit=1`;
    return this.http.get<PokemonList>(pokemonURL).pipe(
      mergeMap((pokemon: PokemonList) => {
         return this.http.get<PokemonDataType>(pokemon.results[0].url).pipe(
          map((pokemon) => {
            return this.pokemonService.pokemonTransformer(pokemon);
          }),
          catchError(this.handleError),
        );
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => 'A data error occurred, cannot get pokemon');
  }
}