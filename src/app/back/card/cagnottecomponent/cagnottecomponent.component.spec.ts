import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagnottecomponentComponent } from './cagnottecomponent.component';

describe('CagnottecomponentComponent', () => {
  let component: CagnottecomponentComponent;
  let fixture: ComponentFixture<CagnottecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CagnottecomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CagnottecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
