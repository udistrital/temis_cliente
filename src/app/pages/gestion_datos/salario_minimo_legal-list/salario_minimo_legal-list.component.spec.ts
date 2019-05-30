import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarioMinimoLegalListComponent } from './salario_minimo_legal-list.component';

describe('SalarioMinimoLegalListComponent', () => {
  let component: SalarioMinimoLegalListComponent;
  let fixture: ComponentFixture<SalarioMinimoLegalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarioMinimoLegalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarioMinimoLegalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
