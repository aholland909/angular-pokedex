import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PokemonPaginationComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  page: number = this.pokemonService.page;
  nextPageURL: string | null = null;
  previousPageURL: string | null = null;

  ngOnInit() {
    this.pokemonService.nextPageURLEvent$.subscribe((event) => (this.nextPageURL = event));
    this.pokemonService.previousPageURLEvent$.subscribe((event) => (this.previousPageURL = event));
  }

  pageChange(newPage: number) {
    this.page = this.pokemonService.pageChange(newPage);
  }
}
