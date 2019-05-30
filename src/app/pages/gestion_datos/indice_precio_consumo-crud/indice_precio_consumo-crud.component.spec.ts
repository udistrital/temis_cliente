import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicePrecioConsumoCrudComponent } from './indice_precio_consumo-crud.component';

describe('IndicePrecioConsumoCrudComponent', () => {
  let component: IndicePrecioConsumoCrudComponent;
  let fixture: ComponentFixture<IndicePrecioConsumoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicePrecioConsumoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicePrecioConsumoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
