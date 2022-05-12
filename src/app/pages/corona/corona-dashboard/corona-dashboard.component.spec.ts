import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaDashboardComponent } from './corona-dashboard.component';

describe('CoronaDashboardComponent', () => {
  let component: CoronaDashboardComponent;
  let fixture: ComponentFixture<CoronaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
