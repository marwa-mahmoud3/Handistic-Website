import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createapp2Component } from './createapp2.component';

describe('Createapp2Component', () => {
  let component: Createapp2Component;
  let fixture: ComponentFixture<Createapp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Createapp2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Createapp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
