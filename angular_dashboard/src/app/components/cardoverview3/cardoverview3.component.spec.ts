import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardoverview3Component } from './cardoverview3.component';

describe('Cardoverview3Component', () => {
  let component: Cardoverview3Component;
  let fixture: ComponentFixture<Cardoverview3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cardoverview3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cardoverview3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
