import { ComponentFixture, TestBed, getTestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { InfoComponent } from './info.component';
import { of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const transformedPokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 10,
  weight: 15,
  image: 'www.bulbasaur.image',
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
};
describe('Pokemon Info page', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  class MockPokemonService {
    get(name: string) {
      return of(transformedPokemon);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoComponent],
      imports: [HttpClientTestingModule, BrowserModule, CommonModule, RouterTestingModule],
      providers: [{ provide: PokemonService, useClass: MockPokemonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the pokemon information', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const title = fixture.debugElement.nativeElement.querySelector('h1');
      expect(title.innerHTML).toContain('bulbasaur');

      const img = fixture.debugElement.nativeElement.querySelector('img');
      expect(img).not.toBe(null);

      const height = fixture.debugElement.nativeElement.querySelector('#height');
      expect(height.textContent).toContain('10');

      const weight = fixture.debugElement.nativeElement.querySelector('#weight');
      expect(weight.textContent).toContain('15');

      // check pokemon stats and types displayed in table
      const pokemonData = fixture.debugElement.nativeElement.querySelectorAll('.table-row');
      expect(pokemonData[0].innerHTML).toContain('hp');
      expect(pokemonData[0].innerHTML).toContain('45');

      expect(pokemonData[1].innerHTML).toContain('attack');
      expect(pokemonData[1].innerHTML).toContain('49');
      expect(pokemonData[2].innerHTML).toContain('grass');
      done();
    });
  });
});
