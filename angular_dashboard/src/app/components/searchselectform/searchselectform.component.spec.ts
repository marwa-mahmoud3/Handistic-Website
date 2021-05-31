import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchselectformComponent } from './searchselectform.component';

describe('SearchselectformComponent', () => {
  let component: SearchselectformComponent;
  let fixture: ComponentFixture<SearchselectformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchselectformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchselectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
