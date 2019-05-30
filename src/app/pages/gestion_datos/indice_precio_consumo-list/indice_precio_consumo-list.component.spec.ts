import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicePrecioConsumoListComponent } from './indice_precio_consumo-list.component';

describe('IndicePrecioConsumoListComponent', () => {
  let component: IndicePrecioConsumoListComponent;
  let fixture: ComponentFixture<IndicePrecioConsumoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicePrecioConsumoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicePrecioConsumoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
