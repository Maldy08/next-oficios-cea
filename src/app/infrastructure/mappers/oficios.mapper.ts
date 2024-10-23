import { Oficios } from "@/app/domain/entities";

export class OficiosMapper {
  static mapFromApiToDomain(result: Oficios): Oficios {
    return {
      ejercicio: result.ejercicio,
      folio: result.folio,
      eor: result.eor,
      tipo: result.tipo,
      noOficio: result.noOficio,
      pdfpath: result.pdfpath,
      fecha: new Date(result.fecha),
      fechaCaptura: new Date(result.fechaCaptura),
      fechaAcuse: new Date(result.fechaAcuse),
      fechaLimite: result.fechaLimite ? new Date(result.fechaLimite) : null,
      remDepen: result.remDepen,
      remSiglas: result.remSiglas,
      remNombre: result.remNombre,
      remCargo: result.remCargo,
      destDepen: result.destDepen,
      destSiglas: result.destSiglas,
      destNombre: result.destNombre,
      destCargo: result.destCargo,
      tema: result.tema,
      estatus: result.estatus,
      empqentrega: result.empqentrega,
      relacionoficio: result.relacionoficio,
      depto: result.depto,
      deptoRespon: result.deptoRespon,
      idEmpleado: result.idEmpleado,
      nombreResponsable: result.nombreResponsable,
      rol: result.rol,
    };
  }

  static mapFromDomainToApi(oficio: Oficios ): Record<string, any> {
    return {
        ['ejercicio']: oficio.ejercicio,
        ['folio']: oficio.folio,
        ['eor']: oficio.eor,
        ['tipo']: oficio.tipo,
        ['noOficio']: oficio.noOficio,
        ['pdfpath']: oficio.pdfpath,
        ['fecha']: oficio.fecha,
        ['fechaCaptura']: oficio.fechaCaptura,
        ['fechaAcuse']: oficio.fechaAcuse,
        ['fechaLimite']: oficio.fechaLimite ? oficio.fechaLimite: null,
        ['remDepen']: oficio.remDepen,
        ['remSiglas']: oficio.remSiglas,
        ['remNombre']: oficio.remNombre,
        ['remCargo']: oficio.remCargo,
        ['destDepen']: oficio.destDepen,
        ['destSiglas']: oficio.destSiglas,
        ['destNombre']: oficio.destNombre,
        ['destCargo']: oficio.destCargo,
        ['tema']: oficio.tema,
        ['estatus']: oficio.estatus,
        ['empqentrega']: oficio.empqentrega,
        ['relacionoficio']: oficio.relacionoficio,
        ['depto']: oficio.depto,
        ['deptoRespon']: oficio.deptoRespon,
        ['idEmpleado']: oficio.idEmpleado,
        ['nombreResponsable']: oficio.nombreResponsable,
        ['rol']: oficio.rol,
        ['archivo'] : oficio.archivo
    };
  }
}