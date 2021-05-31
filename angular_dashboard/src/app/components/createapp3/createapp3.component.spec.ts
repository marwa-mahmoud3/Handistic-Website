import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createapp3Component } from './createapp3.component';

describe('Createapp3Component', () => {
  let component: Createapp3Component;
  let fixture: ComponentFixture<Createapp3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Createapp3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Createapp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
