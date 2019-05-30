import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtfListComponent } from './dtf-list.component';

describe('DtfListComponent', () => {
  let component: DtfListComponent;
  let fixture: ComponentFixture<DtfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
