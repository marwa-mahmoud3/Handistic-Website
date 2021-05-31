import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentListComponent } from './talent-list.component';

describe('TalentListComponent', () => {
  let component: TalentListComponent;
  let fixture: ComponentFixture<TalentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
