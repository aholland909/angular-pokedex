import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonPaginationComponent } from 'src/app/components/pagination/pagination.component';
import { PokemonCardComponent } from 'src/app/components/pokemon/card/card.component';
import { HomepageComponent } from './homepage.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent, PokemonCardComponent, PokemonPaginationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have cards and pagination', () => {
    const cards = fixture.debugElement.nativeElement.querySelector('app-pokemon-card');
    expect(cards).toBeTruthy();

    const pagination = fixture.debugElement.nativeElement.querySelector('app-pokemon-pagination');
    expect(pagination).toBeTruthy();
  });
});
