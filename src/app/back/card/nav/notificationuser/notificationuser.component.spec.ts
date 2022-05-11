import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationuserComponent } from './notificationuser.component';

describe('NotificationuserComponent', () => {
  let component: NotificationuserComponent;
  let fixture: ComponentFixture<NotificationuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
