import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have cards and pagination', () => {
    const cards = fixture.debugElement.nativeElement.querySelector('app-pokemon-card')
    expect(cards).toBeTruthy()

    const pagination = fixture.debugElement.nativeElement.querySelector('app-pokemon-pagination')
    expect(pagination).toBeTruthy()
  });
});
