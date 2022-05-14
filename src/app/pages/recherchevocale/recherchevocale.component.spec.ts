import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchevocaleComponent } from './recherchevocale.component';

describe('RecherchevocaleComponent', () => {
  let component: RecherchevocaleComponent;
  let fixture: ComponentFixture<RecherchevocaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecherchevocaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecherchevocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
