import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteReiewsComponent } from './site-reiews.component';

describe('SiteReiewsComponent', () => {
  let component: SiteReiewsComponent;
  let fixture: ComponentFixture<SiteReiewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteReiewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteReiewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
