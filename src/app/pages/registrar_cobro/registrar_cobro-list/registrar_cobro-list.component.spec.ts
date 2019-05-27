import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCobroListComponent } from './registrar-cobro-list.component';

describe('RegistrarCobroListComponent', () => {
  let component: RegistrarCobroListComponent;
  let fixture: ComponentFixture<RegistrarCobroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCobroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCobroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
