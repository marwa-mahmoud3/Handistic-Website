import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwolinechartComponent } from './twolinechart.component';

describe('TwolinechartComponent', () => {
  let component: TwolinechartComponent;
  let fixture: ComponentFixture<TwolinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwolinechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwolinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
