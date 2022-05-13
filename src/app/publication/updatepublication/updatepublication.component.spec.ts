import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepublicationComponent } from './updatepublication.component';

describe('UpdatepublicationComponent', () => {
  let component: UpdatepublicationComponent;
  let fixture: ComponentFixture<UpdatepublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
