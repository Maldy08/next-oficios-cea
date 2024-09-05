import { DepartamentosRepository } from "@/app/application/interfaces/departamentos.interface.repository";
import { Departamentos } from "@/app/domain/entities";
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
    try {
      const { data } = await DbAdapter.get<Result<Departamentos[]>>(
        "departamentos"
      ); // Ruta correcta
      return data.map((departamento) =>
        DepartamentosMapper.mapFromApiToDomain(departamento)
      );
    } catch (error) {
      console.error("Error fetching departamentos from repository:", error);
      throw new Error("Error fetching departamentos from repository");
    }
  }
}
