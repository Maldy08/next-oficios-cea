import { Oficios } from "@/app/domain/entities";

export class OficiosMapper {
    static mapFromApiToDomain(data: any): Oficios {
        return {
            ejercicio: data.ejercicio,
            folio: data.folio,
            eor: data.eor,
            tipo: data.tipo,
            noOficio: data.noOficio,
            pdfpath: data.pdfpath,
            fecha: new Date(data.fecha),
            fechaCaptura: new Date(data.fechaCaptura),
            fechaAcuse: new Date(data.fechaAcuse),
            fechaLimite: data.fechaLimite ? new Date(data.fechaLimite) : null,
            remDepen: data.remDepen,
            remSiglas: data.remSiglas,
            remNombre: data.remNombre,
            remCargo: data.remCargo,
            destDepen: data.destDepen,
            destSiglas: data.destSiglas,
            destNombre: data.destNombre,
            destCargo: data.destCargo,
            tema: data.tema,
            estatus: data.estatus,
            empqentrega: data.empqentrega,
            relacionoficio: data.relacionoficio,
            depto: data.depto,
            deptoRespon: data.deptoRespon,
            idEmpleado: data.idEmpleado,
            nombreResponsable: data.nombreResponsable,
            rol: data.rol,
        };
    }
}
