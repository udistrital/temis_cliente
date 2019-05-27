import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoAceptadoCrudComponent } from './monto-aceptado-crud.component';

describe('MontoAceptadoCrudComponent', () => {
  let component: MontoAceptadoCrudComponent;
  let fixture: ComponentFixture<MontoAceptadoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoAceptadoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoAceptadoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
