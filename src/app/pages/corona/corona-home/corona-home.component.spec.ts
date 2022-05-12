import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaHomeComponent } from './corona-home.component';

describe('CoronaHomeComponent', () => {
  let component: CoronaHomeComponent;
  let fixture: ComponentFixture<CoronaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
