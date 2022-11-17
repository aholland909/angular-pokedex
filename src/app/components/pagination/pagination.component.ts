import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PokemonPaginationComponent implements OnInit {

  constructor(private pokemonService: PokemonService){}

  page: number = 1;
  nextPageURL: string | null = null;
  previousPageURL: string | null = null;

  ngOnInit() {
    this.pokemonService.nextPageURLEvent$.forEach(event => this.nextPageURL = event);
    this.pokemonService.previousPageURLEvent$.forEach(event => this.previousPageURL = event);
  }

  pageChange(newPage:number) {
    this.page = this.pokemonService.pageChange(newPage)
  }
}