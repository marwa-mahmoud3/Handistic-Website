import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardoverview2Component } from './cardoverview2.component';

describe('Cardoverview2Component', () => {
  let component: Cardoverview2Component;
  let fixture: ComponentFixture<Cardoverview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cardoverview2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cardoverview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
