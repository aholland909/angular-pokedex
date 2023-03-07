import { ComponentFixture, TestBed, getTestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, Subject } from 'rxjs';
import { PokemonType } from 'src/types/pokemon';
import { PokemonCardComponent } from './card.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient } from '@angular/common/http';

const transformedPokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 10,
    weight: 15,
    image: 'www.bulbasaur.image',
    stats: [],
    types: [],
  },
];

describe('Pokemon Card component test', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let de: DebugElement;
  let mockPageSubject = new Subject<number>();

  class MockPokemon {
    getPagedPokemon() {
      return of(transformedPokemon);
    }
    get getPageChangeEvent$() {
      return mockPageSubject.asObservable();
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        CommonModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [{ provide: PokemonService, useClass: MockPokemon }, TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show Pokemon Data', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const title = fixture.debugElement.nativeElement.querySelector('.pokemon-title');
      expect(title.textContent).toEqual('bulbasaur');

      const img = fixture.debugElement.nativeElement.querySelector('img');
      expect(img).not.toBe(null);

      const height = fixture.debugElement.nativeElement.querySelector('#height');
      expect(height.textContent).toContain(10);

      const weight = fixture.debugElement.nativeElement.querySelector('#weight');
      expect(weight.textContent).toContain(15);

      const button = fixture.debugElement.nativeElement.querySelector('.pokemon-button');
      const buttonLinkText = button.getAttribute('ng-reflect-router-link');

      expect(buttonLinkText).toEqual('/pokemon/bulbasaur');

      done();
    });
  });
});
