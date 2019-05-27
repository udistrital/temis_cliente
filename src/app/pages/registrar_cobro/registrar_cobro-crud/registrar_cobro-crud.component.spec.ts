import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCobroCrudComponent } from './registrar-cobro-crud.component';

describe('RegistrarCobroCrudComponent', () => {
  let component: RegistrarCobroCrudComponent;
  let fixture: ComponentFixture<RegistrarCobroCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCobroCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCobroCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
