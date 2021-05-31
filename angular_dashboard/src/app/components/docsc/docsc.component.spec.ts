import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocscComponent } from './docsc.component';

describe('DocscComponent', () => {
  let component: DocscComponent;
  let fixture: ComponentFixture<DocscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
