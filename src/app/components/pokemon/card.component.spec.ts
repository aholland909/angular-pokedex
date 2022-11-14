import { ComponentFixture, TestBed, getTestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { PokemonType } from 'src/types/pokemon';
import { PokemonCardComponent } from './card.component';
import { PokemonService } from 'src/app/services/pokemon.service';

const transformedPokemon = {
  name: 'bulbasaur',
  height: 10,
  weight: 15,
  image: 'www.bulbasaur.image',
};

describe('Pokemon Card component test', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let de: DebugElement;

  const MockPokemon = {
    get: (name: string) => {
      return of(transformedPokemon);
    }
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PokemonService, useValue: MockPokemon }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show Pokemon Data', async () => {
    const img = fixture.debugElement.nativeElement.querySelector('img');
    expect(img).not.toBe(null);

    const title = fixture.debugElement.nativeElement.querySelector('.pokemon-title');
    expect(title.textContent).toEqual('bulbasaur');

    const height = fixture.debugElement.nativeElement.querySelector('#height');
    expect(height.textContent).toContain(10);

    const weight = fixture.debugElement.nativeElement.querySelector('#weight');
    expect(weight.textContent).toContain(15);
  });
});
