import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionListComponent } from './organizacion-list.component';

describe('OrganizacionListComponent', () => {
  let component: OrganizacionListComponent;
  let fixture: ComponentFixture<OrganizacionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
