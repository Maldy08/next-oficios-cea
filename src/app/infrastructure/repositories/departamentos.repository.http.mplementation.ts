import {
  DepartamentosRepository,
  EmpleadosRepository,
} from "@/app/application/interfaces/departamentos.interface.repository";
import { Departamentos, Empleados } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import {
  DepartamentosMapper,
  EmpleadosMapper,
} from "../mappers/departamentos.mapper";

export class DepartamentosRepositoryHttpImplementation
  implements DepartamentosRepository
{
  async getAllDepartamentos(): Promise<Departamentos[]> {
    const { data } = await DbAdapter.get<Result<Departamentos[]>>(
      "departamentos"
    );

    return data.map((departamento) =>
      DepartamentosMapper.mapFromApiToDomain(departamento)
    );
  }
}

export class EmpleadosRepositoryHttpImplementation
  implements EmpleadosRepository
{
  async getAllEmpleados(): Promise<Empleados[]> {
    const { data } = await DbAdapter.get<Result<Empleados[]>>("nombreCompleto");

    return data.map((empleados) =>
      EmpleadosMapper.mapFromApiEmpleados(empleados)
    );
  }
}
