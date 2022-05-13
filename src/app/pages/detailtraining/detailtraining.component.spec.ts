import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtrainingComponent } from './detailtraining.component';

describe('DetailtrainingComponent', () => {
  let component: DetailtrainingComponent;
  let fixture: ComponentFixture<DetailtrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailtrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
