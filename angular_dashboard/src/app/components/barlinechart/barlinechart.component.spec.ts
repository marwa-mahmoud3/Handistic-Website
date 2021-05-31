import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarlinechartComponent } from './barlinechart.component';

describe('BarlinechartComponent', () => {
  let component: BarlinechartComponent;
  let fixture: ComponentFixture<BarlinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarlinechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarlinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
