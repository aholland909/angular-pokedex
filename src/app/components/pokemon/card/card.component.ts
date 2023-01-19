import { Component } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class PokemonCardComponent {
  constructor(private pokemonService: PokemonService) {}

  pagedPokemon$? = this.pokemonService.getPagedPokemon$;
}
