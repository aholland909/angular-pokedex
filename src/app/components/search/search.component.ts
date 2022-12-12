import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(public pokemonService: PokemonService, private router: Router) {}

  searchText: string = '';
  allPokemon: any = [];
  focus: boolean = false;

  ngOnInit(): void {
    this.allPokemon = this.setupSearch();
  }

  focusInput(focusStatus: boolean) {
    this.focus = focusStatus;
  }

  gotoPokemon(name: string) {
    this.focus = false;
    this.router.navigateByUrl('/pokemon/' + name);
  }

  setupSearch() {
    if (localStorage.getItem('allPokemon') == null) {
      console.error('Error no pokemon');
      return [];
    }
    return JSON.parse(localStorage.getItem('allPokemon')!);
  }
}
