import { Component, OnInit } from '@angular/core';
import { PokemonType } from 'src/types/pokemon';
import { Quiz } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  totalPokemon = 1154;
  pokemonGuess: string = '';
  guessed: boolean = false;
  loading: boolean = true;
  answer: string = '';
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

  constructor(private pokemonQuiz: Quiz) {}

  ngOnInit(): void {
    this.getRandomPokemon(this.getRandomIndex());
  }

  getRandomIndex(): number {
    return Math.floor(Math.random() * this.totalPokemon - 1);
  }

  getRandomPokemon(randomIndex: number) {
    this.pokemonQuiz.getRandomPokemon(randomIndex.toString()).subscribe((data: PokemonType) => {
      this.pokemon = [data];
      this.loading = false;
    });
  }

  submit(event?:KeyboardEvent) {

    if(event && event.key !== 'Enter') return

    if (this.guessed) {
      this.loading = true;
      this.pokemonGuess = '';
      this.pokemon[0].image = ''
      this.guessed = false;
      this.getRandomPokemon(this.getRandomIndex());
      return;
    }

    if (this.pokemon[0].name === this.pokemonGuess.toLowerCase()) {
      this.answer = `Correct! It was ${this.pokemon[0].name}!`
    } else {
      this.answer = `Nice try! It was ${this.pokemon[0].name}!`
    }
    this.guessed = true;
    return;
  }

  hint(){
    alert("Sorry no hint for you ;)")
  }
}
