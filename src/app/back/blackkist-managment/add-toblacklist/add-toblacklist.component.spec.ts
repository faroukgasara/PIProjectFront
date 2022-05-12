import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToblacklistComponent } from './add-toblacklist.component';

describe('AddToblacklistComponent', () => {
  let component: AddToblacklistComponent;
  let fixture: ComponentFixture<AddToblacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToblacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToblacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
