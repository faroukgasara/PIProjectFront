import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionEmotionComponent } from './prediction-emotion.component';

describe('PredictionEmotionComponent', () => {
  let component: PredictionEmotionComponent;
  let fixture: ComponentFixture<PredictionEmotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionEmotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionEmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
