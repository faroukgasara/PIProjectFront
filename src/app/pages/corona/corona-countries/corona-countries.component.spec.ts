import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaCountriesComponent } from './corona-countries.component';

describe('CoronaCountriesComponent', () => {
  let component: CoronaCountriesComponent;
  let fixture: ComponentFixture<CoronaCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronaCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
