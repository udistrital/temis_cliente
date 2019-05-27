import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionadoListComponent } from './pensionado-list.component';

describe('PensionadoListComponent', () => {
  let component: PensionadoListComponent;
  let fixture: ComponentFixture<PensionadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
