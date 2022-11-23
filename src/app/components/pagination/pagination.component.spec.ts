import { ComponentFixture, TestBed, getTestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, Subject } from 'rxjs';
import { PokemonType } from 'src/types/pokemon';
import { PokemonPaginationComponent } from './pagination.component';
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
  let component: PokemonPaginationComponent;
  let fixture: ComponentFixture<PokemonPaginationComponent>;
  let de: DebugElement;
  let mockPageSubject = new Subject<number>();
  let mockNextPageSubject = new Subject<null | string>();
  let mockPreviousPageSubject = new Subject<null | string>();
  let mockPageNumber = 1;

  class MockPokemon {
    getAll() {
      return of(transformedPokemon);
    }
    get getPageChangeEvent$() {
      return mockPageSubject.asObservable();
    }
    get nextPageURLEvent$() {
      return mockNextPageSubject.asObservable();
    }
    get previousPageURLEvent$() {
      return mockPreviousPageSubject.asObservable();
    }
    pageChange() {
      return mockPageNumber;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonPaginationComponent],
      imports: [HttpClientTestingModule, BrowserModule, CommonModule],
      providers: [{ provide: PokemonService, useClass: MockPokemon }],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPaginationComponent);
    component = fixture.componentInstance;

    TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('Should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('Should show correct button pagination button state', (done: DoneFn) => {
    //no page state
    mockNextPageSubject.next(null);
    mockPreviousPageSubject.next(null);

    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelectorAll('.button-container');
    expect(button[0].innerHTML).toContain('class="disabled"');
    expect(button[1].innerHTML).toContain('class="disabled');

    //first page state
    mockNextPageSubject.next('https://pokeapi.com/nextPageURL');
    mockPreviousPageSubject.next(null);

    fixture.detectChanges();
    button = fixture.debugElement.nativeElement.querySelectorAll('.button-container');
    expect(button[0].innerHTML).toContain('class="disabled"');
    expect(button[1].innerHTML).toContain('class="active');

    //second page state
    mockNextPageSubject.next('https://pokeapi.com/nextPageURL');
    mockPreviousPageSubject.next('https://pokeapi.com/prevPageURL');

    fixture.detectChanges();
    button = fixture.debugElement.nativeElement.querySelectorAll('.button-container');
    expect(button[0].innerHTML).toContain('class="active"');
    expect(button[1].innerHTML).toContain('class="active');

    done();
  });

  it('Should call pageChange service function', (done: DoneFn) => {
    let spy = spyOn<any>(component, 'pageChange');

    mockNextPageSubject.next('https://pokeapi.com/nextPageURL');
    mockPreviousPageSubject.next('https://pokeapi.com/prevPageURL');
    fixture.detectChanges();

    const nextButtonSelector = '.button-container:nth-child(3) > button';
    const previousButtonSelector = '.button-container:nth-child(1) > button';

    let nextButton = fixture.debugElement.nativeElement.querySelector(nextButtonSelector);
    nextButton.click();

    fixture.detectChanges();
    expect(component.pageChange).toHaveBeenCalled();

    let previousButton = fixture.debugElement.nativeElement.querySelector(previousButtonSelector);
    previousButton.click();
    fixture.detectChanges();
    expect(component.pageChange).toHaveBeenCalled();

    done();
  });
});
