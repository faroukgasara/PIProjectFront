import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsbackComponent } from './trainingsback.component';

describe('TrainingsbackComponent', () => {
  let component: TrainingsbackComponent;
  let fixture: ComponentFixture<TrainingsbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
