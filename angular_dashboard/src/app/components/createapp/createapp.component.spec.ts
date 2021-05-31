import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappComponent } from './createapp.component';

describe('CreateappComponent', () => {
  let component: CreateappComponent;
  let fixture: ComponentFixture<CreateappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
