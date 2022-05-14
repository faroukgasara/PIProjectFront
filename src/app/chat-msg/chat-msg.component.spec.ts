import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMSGComponent } from './chat-msg.component';

describe('ChatMSGComponent', () => {
  let component: ChatMSGComponent;
  let fixture: ComponentFixture<ChatMSGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMSGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMSGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
