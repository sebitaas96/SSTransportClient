import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesExpedidosComponent } from './viajes-expedidos.component';

describe('ViajesExpedidosComponent', () => {
  let component: ViajesExpedidosComponent;
  let fixture: ComponentFixture<ViajesExpedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesExpedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesExpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
