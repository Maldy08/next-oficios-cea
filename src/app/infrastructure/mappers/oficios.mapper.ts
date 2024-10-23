import { Oficios } from "@/app/domain/entities";

export class OficiosMapper {
    static mapFromDomainToApi(oficio: Oficios) {
      throw new Error("Method not implemented.");
    }
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
}
