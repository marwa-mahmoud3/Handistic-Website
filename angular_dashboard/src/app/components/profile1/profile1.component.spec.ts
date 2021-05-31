import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile1Component } from './profile1.component';

describe('Profile1Component', () => {
  let component: Profile1Component;
  let fixture: ComponentFixture<Profile1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Profile1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Profile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
