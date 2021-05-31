import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardoverview4Component } from './cardoverview4.component';

describe('Cardoverview4Component', () => {
  let component: Cardoverview4Component;
  let fixture: ComponentFixture<Cardoverview4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cardoverview4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cardoverview4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
