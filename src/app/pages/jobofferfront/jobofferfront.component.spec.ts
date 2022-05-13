import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofferfrontComponent } from './jobofferfront.component';

describe('JobofferfrontComponent', () => {
  let component: JobofferfrontComponent;
  let fixture: ComponentFixture<JobofferfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobofferfrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofferfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
