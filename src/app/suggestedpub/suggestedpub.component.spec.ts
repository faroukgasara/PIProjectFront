import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedpubComponent } from './suggestedpub.component';

describe('SuggestedpubComponent', () => {
  let component: SuggestedpubComponent;
  let fixture: ComponentFixture<SuggestedpubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedpubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
