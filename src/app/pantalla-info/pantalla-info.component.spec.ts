import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaInfoComponent } from './pantalla-info.component';

describe('PantallaInfoComponent', () => {
  let component: PantallaInfoComponent;
  let fixture: ComponentFixture<PantallaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
