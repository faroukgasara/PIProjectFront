import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTrainingComponent } from './chat-training.component';

describe('ChatTrainingComponent', () => {
  let component: ChatTrainingComponent;
  let fixture: ComponentFixture<ChatTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
