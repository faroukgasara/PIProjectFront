import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportinManagmentComponent } from './reportin-managment.component';

describe('ReportinManagmentComponent', () => {
  let component: ReportinManagmentComponent;
  let fixture: ComponentFixture<ReportinManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportinManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportinManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
