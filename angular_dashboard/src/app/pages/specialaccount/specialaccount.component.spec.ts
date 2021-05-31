import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialaccountComponent } from './specialaccount.component';

describe('SpecialaccountComponent', () => {
  let component: SpecialaccountComponent;
  let fixture: ComponentFixture<SpecialaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
