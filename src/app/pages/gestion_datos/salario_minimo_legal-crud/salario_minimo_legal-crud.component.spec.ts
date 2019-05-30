import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarioMinimoLegalCrudComponent } from './salario_minimo_legal-crud.component';

describe('SalarioMinimoLegalCrudComponent', () => {
  let component: SalarioMinimoLegalCrudComponent;
  let fixture: ComponentFixture<SalarioMinimoLegalCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarioMinimoLegalCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarioMinimoLegalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
