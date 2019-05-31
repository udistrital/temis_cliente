import { MontoAceptadoModel } from './monto_aceptado';

export class RegistrarCobroModel {
    ConsecutivoCuentaCobro: number;
    FechaDesdePago: Date;
    FechaHastaPago: Date;
    FechaResolucionOrdenPago: Date;
    Id: number;
    ObservacionesPago: string;
    RegistrarMontoAceptadoPorCobrarId: MontoAceptadoModel;
    ResolucionOrdenPago: string;
    ValorCuentaCobro: number
}