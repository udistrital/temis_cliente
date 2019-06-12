import { Organizacion } from "./organizacion";
import { CargoModel } from "./cargo";
import { Persona } from "./persona";
import { TipoDedicacionModel } from "./tipo_dedicacion";
import { TipoVinculacion } from "./tipo_vinculacion";

export class ExperienciaLaboralModel {
    Actividades: string;
    FechaFinalizacion: Date;
    FechaInicio: Date;
    Id: number;
    Organizacion: number;
    Cargo: CargoModel;
    Persona: number;
    TipoVinculacion: TipoVinculacion;
    TipoDedicacion: TipoDedicacionModel;
}