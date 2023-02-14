import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(public pokemonService: PokemonService, public searchService: SearchService,  private router: Router) {}

  searchText: string = '';
  allPokemon: any = [];
  focus: boolean = false;

  ngOnInit(): void {
    this.searchService.localStorageReplay().subscribe(data => this.allPokemon = data)
  }

  focusInput(focusStatus: boolean) {
    this.focus = focusStatus;
  }

  gotoPokemon(name: string) {
    this.searchText = ""
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
