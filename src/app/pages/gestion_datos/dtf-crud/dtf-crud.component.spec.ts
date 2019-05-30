import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtfCrudComponent } from './dtf-crud.component';

describe('DtfCrudComponent', () => {
  let component: DtfCrudComponent;
  let fixture: ComponentFixture<DtfCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtfCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtfCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
