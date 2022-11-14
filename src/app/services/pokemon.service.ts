import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PokemonType, PokemonDataType } from 'src/types/pokemon';

const pokemonTransformer = (pokemon:PokemonDataType) => {
  return {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    image: pokemon.sprites.other["official-artwork"].front_default
  }
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  
  baseURL: string = 'https://pokeapi.co/api/v2/pokemon/'
  constructor(private http: HttpClient) {}

  get(name: string) {
    return this.http.get<PokemonDataType>(this.baseURL + name).pipe(
      map(pokemonTransformer),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}
