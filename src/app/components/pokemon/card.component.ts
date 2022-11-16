import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDataType, PokemonType } from 'src/types/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class PokemonCardComponent implements OnInit {

  constructor(private pokemonService: PokemonService){}

  pokemon:PokemonType[] = [{
    name: "",
    height: 0,
    weight: 0,
    image: ""
  }]

  ngOnInit() {
    this.pokemonService.getAll().subscribe(data => {
      this.pokemon = data;
      console.log(data)
    })
  }
}