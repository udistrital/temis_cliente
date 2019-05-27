import { TestBed, inject } from '@angular/core/testing';

import { GestionDatosService } from './gestion-datos.service';

describe('GestionDatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionDatosService]
    });
  });

  it('should be created', inject([GestionDatosService], (service: GestionDatosService) => {
    expect(service).toBeTruthy();
  }));
});
