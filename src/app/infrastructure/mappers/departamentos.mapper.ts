import { Departamentos, Empleados } from "@/app/domain/entities";

export class DepartamentosMapper {
  static mapFromApiToDomain(result: Departamentos): Departamentos {
    return {
      accion: result.accion,
      agrupaDir: result.agrupaDir,
      agrupaPoa: result.agrupaPoa,
      descripcion: result.descripcion,
      empRespon: result.empRespon,
      id: result.id,
      idCea: result.idCea,
      idReporta: result.idReporta,
      idShpoa: result.idShpoa,
      meta: result.meta,
      nivel: result.nivel,
      oficial: result.oficial,
      prog: result.prog,
    };
  }
}

export class EmpleadosMapper {
  static mapFromApiEmpleados(result: Empleados): Empleados {
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
      correo: result.correo,
    };
  }
}
