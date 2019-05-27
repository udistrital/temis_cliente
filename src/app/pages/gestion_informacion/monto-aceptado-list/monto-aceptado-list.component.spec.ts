import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoAceptadoListComponent } from './monto-aceptado-list.component';

describe('MontoAceptadoListComponent', () => {
  let component: MontoAceptadoListComponent;
  let fixture: ComponentFixture<MontoAceptadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoAceptadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoAceptadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
