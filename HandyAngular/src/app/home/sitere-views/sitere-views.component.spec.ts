import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitereViewsComponent } from './sitere-views.component';

describe('SitereViewsComponent', () => {
  let component: SitereViewsComponent;
  let fixture: ComponentFixture<SitereViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitereViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitereViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
