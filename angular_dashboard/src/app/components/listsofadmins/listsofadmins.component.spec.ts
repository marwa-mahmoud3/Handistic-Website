import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsofadminsComponent } from './listsofadmins.component';

describe('ListsofadminsComponent', () => {
  let component: ListsofadminsComponent;
  let fixture: ComponentFixture<ListsofadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsofadminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsofadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
