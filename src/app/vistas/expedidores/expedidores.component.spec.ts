import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedidoresComponent } from './expedidores.component';

describe('ExpedidoresComponent', () => {
  let component: ExpedidoresComponent;
  let fixture: ComponentFixture<ExpedidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
