import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetedgroupsComponent } from './targetedgroups.component';

describe('TargetedgroupsComponent', () => {
  let component: TargetedgroupsComponent;
  let fixture: ComponentFixture<TargetedgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetedgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetedgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
