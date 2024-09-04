import { DepartamentosRepository } from "@/app/application/interfaces/departamentos.interface.repository";
import { Departamentos } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { DepartamentosMapper } from "../mappers/departamentos.mapper";

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
