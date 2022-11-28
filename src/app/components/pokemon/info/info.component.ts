import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonType } from 'src/types/pokemon';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  name: string = '';
  pokemon: PokemonType = {
    name: '',
    height: 0,
    weight: 0,
    image: '',
    stats: [],
    types: [],
  };

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2];
    this.getPokemonData(this.name);
  }

  getPokemonData(name: string) {
    this.pokemonService.get(name).subscribe({
      next: (data) => (this.pokemon = data[0]),
      error: (e) => this.router.navigateByUrl('/404'),
    });
  }
}
