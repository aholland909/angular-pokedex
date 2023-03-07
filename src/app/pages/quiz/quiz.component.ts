import { Component, OnInit } from '@angular/core';
import { PokemonType } from 'src/types/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  totalPokemon = 1154;

  pokemon: PokemonType[] = [
    {
      id: 1,
      name: '',
      height: 0,
      weight: 0,
      image: '',
      stats: [],
      types: [],
    },
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.totalPokemon - 1);
    this.getRandomPokemon(randomIndex)
  }

  getRandomPokemon(randomIndex: number) {
    this.pokemonService.getRandomPokemon(randomIndex.toString()).subscribe((data) => {
      this.pokemon = [data];
      console.log(data);
    });
  }
}
