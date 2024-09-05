import { Empleados } from "@/app/domain/entities";

export class EmpleadosMapper {
    static mapFromApiToDomain(result: any): Empleados {
        return {
            activo: result.activo,
            empleado: result.empleado,
            nombre: result.nombre,
            materno: result.materno,
            paterno: result.paterno,
            idPue: result.idPue,
            descripcionPuesto: result.descripcionPuesto,
            deptoUe: result.deptoUe,
            deptoPpto: result.deptoPpto,
            obra: result.obra,
            descripcionDepto: result.descripcionDepto,
            deptoComi: result.deptoComi,
            nombreCompleto: result.nombreCompleto,
            municipio: result.municipio,
            oficina: result.oficina,
            nivel: result.nivel,
            lugarTrab: result.lugarTrab,
            correo: result.correo
        };
    }
}
