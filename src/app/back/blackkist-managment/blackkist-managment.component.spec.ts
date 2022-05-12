import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackkistManagmentComponent } from './blackkist-managment.component';

describe('BlackkistManagmentComponent', () => {
  let component: BlackkistManagmentComponent;
  let fixture: ComponentFixture<BlackkistManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackkistManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackkistManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
