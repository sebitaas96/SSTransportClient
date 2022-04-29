import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnusComponent } from './onus.component';

describe('OnusComponent', () => {
  let component: OnusComponent;
  let fixture: ComponentFixture<OnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
