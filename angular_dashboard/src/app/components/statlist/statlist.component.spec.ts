import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatlistComponent } from './statlist.component';

describe('StatlistComponent', () => {
  let component: StatlistComponent;
  let fixture: ComponentFixture<StatlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
