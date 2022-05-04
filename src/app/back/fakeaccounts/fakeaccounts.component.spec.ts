import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeaccountsComponent } from './fakeaccounts.component';

describe('FakeaccountsComponent', () => {
  let component: FakeaccountsComponent;
  let fixture: ComponentFixture<FakeaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeaccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
