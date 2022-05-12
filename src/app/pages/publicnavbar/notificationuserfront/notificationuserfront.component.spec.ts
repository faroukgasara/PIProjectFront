import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationuserfrontComponent } from './notificationuserfront.component';

describe('NotificationuserfrontComponent', () => {
  let component: NotificationuserfrontComponent;
  let fixture: ComponentFixture<NotificationuserfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationuserfrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationuserfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
