import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturComponent } from './candidatur.component';

describe('CandidaturComponent', () => {
  let component: CandidaturComponent;
  let fixture: ComponentFixture<CandidaturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
