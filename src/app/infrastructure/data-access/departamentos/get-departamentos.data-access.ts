import { GetAllDepartamentosUseCase } from "@/app/application/use-cases/departamentos/get-all-departamentos";
import { DepartamentosRepositoryHttpImplementation } from "../../repositories/departamentos.repository.http.mplementation";
import { Departamentos } from "@/app/domain/entities";


export async function getDepartamentos() : Promise<Departamentos[]> {
    const fetchaGetAllDepartamentosUseCase = new GetAllDepartamentosUseCase(new DepartamentosRepositoryHttpImplementation());
    return await fetchaGetAllDepartamentosUseCase.execute();
}