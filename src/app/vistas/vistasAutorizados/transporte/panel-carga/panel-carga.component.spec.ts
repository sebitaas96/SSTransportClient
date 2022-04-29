import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCargaComponent } from './panel-carga.component';

describe('PanelCargaComponent', () => {
  let component: PanelCargaComponent;
  let fixture: ComponentFixture<PanelCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
