import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeReservadoComponent } from './viaje-reservado.component';

describe('ViajeReservadoComponent', () => {
  let component: ViajeReservadoComponent;
  let fixture: ComponentFixture<ViajeReservadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajeReservadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeReservadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
