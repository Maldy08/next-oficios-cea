import {
  GetAllDepartamentosUseCase,
  GetallEmpleadosUseCase,
} from "@/app/application/use-cases/departamentos/get-all-departamentos";
import {
  DepartamentosRepositoryHttpImplementation,
  EmpleadosRepositoryHttpImplementation,
} from "../../repositories/departamentos.repository.http.mplementation";
import { Departamentos, Empleados } from "@/app/domain/entities";

export async function getDepartamentos(): Promise<Departamentos[]> {
  const fetchaGetAllDepartamentosUseCase = new GetAllDepartamentosUseCase(
    new DepartamentosRepositoryHttpImplementation()
  );
  return await fetchaGetAllDepartamentosUseCase.execute();
}

export async function getEmpleados(): Promise<Empleados[]> {
  const fetchaGetAllEmpleados = new GetallEmpleadosUseCase(
    new EmpleadosRepositoryHttpImplementation()
  );
  return await fetchaGetAllEmpleados.execute();
}
