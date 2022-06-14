import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInsideComponent } from './footer-inside.component';

describe('FooterInsideComponent', () => {
  let component: FooterInsideComponent;
  let fixture: ComponentFixture<FooterInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterInsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
