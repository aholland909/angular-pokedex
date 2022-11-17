import { ComponentFixture, TestBed, getTestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, Subject } from 'rxjs';
import { PokemonType } from 'src/types/pokemon';
import { PokemonCardComponent } from './card.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CommonModule } from '@angular/common';

const transformedPokemon = [
  {
    name: 'bulbasaur',
    height: 10,
    weight: 15,
    image: 'www.bulbasaur.image',
  },
];

describe('Pokemon Card component test', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let de: DebugElement;
  let mockPageSubject: Subject<number>;

  const MockPokemon = {
    getAll: () => {
      return of(transformedPokemon);
    },
    getPageChangeEvent: () => {
      return mockPageSubject;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserModule, CommonModule],
      providers: [{ provide: PokemonService, useValue: MockPokemon }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;

    //setup new subjects
    mockPageSubject = new Subject();

    fixture.detectChanges();
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show Pokemon Data', (done:DoneFn) => {
    // const img = fixture.debugElement.nativeElement.querySelector('img');
    // expect(img).not.toBe(null);

    fixture.whenStable().then(() => {

      fixture.detectChanges();

      console.log(fixture.debugElement.nativeElement);

      const title = fixture.debugElement.nativeElement.querySelector('.pokemon-title');
      expect(title.textContent).toEqual('bulbasaur');
      done();
    });


    // const height = fixture.debugElement.nativeElement.querySelector('#height');
    // expect(height.textContent).toContain(10);

    // const weight = fixture.debugElement.nativeElement.querySelector('#weight');
    // expect(weight.textContent).toContain(15);
  });
});
