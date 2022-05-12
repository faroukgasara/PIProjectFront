import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectercagreseventComponent } from './affectercagresevent.component';

describe('AffectercagreseventComponent', () => {
  let component: AffectercagreseventComponent;
  let fixture: ComponentFixture<AffectercagreseventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectercagreseventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectercagreseventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
