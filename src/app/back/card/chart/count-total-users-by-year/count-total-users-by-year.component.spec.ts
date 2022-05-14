import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTotalUsersByYearComponent } from './count-total-users-by-year.component';

describe('CountTotalUsersByYearComponent', () => {
  let component: CountTotalUsersByYearComponent;
  let fixture: ComponentFixture<CountTotalUsersByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountTotalUsersByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountTotalUsersByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
