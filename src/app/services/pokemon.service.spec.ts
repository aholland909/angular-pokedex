import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

const mockPokemonResponse = {
  name: 'bulbasaur',
  height: 10,
  weight: 15,
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'www.bulbasaur.image',
      },
    },
  },
};

const transformedPokemon = {
  name: 'bulbasaur',
  height: 10,
  weight: 15,
  image: 'www.bulbasaur.image',
};

let httpTestingController: HttpTestingController;
let service: PokemonService;
let httpClient: HttpClient;

describe('PokemonService Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', (done: DoneFn) => {
    service.get('mock').subscribe((data) => {
      //check pokemon has been transformed
      expect(data).toEqual(transformedPokemon);
      done();
    });
    const req = httpTestingController.expectOne(`https://pokeapi.co/api/v2/pokemon/mock`);
    req.flush(mockPokemonResponse);
  });
});
