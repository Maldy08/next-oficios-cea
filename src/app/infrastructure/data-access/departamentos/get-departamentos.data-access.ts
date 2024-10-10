import {
  GetAllDepartamentosUseCase,
  GetallEmpleadosUseCase,
} from "@/app/application/use-cases/departamentos/get-all-departamentos";

import { DepartamentosRepositoryHttpImplementation } from "../../repositories/departamentos.repository.http.mplementation";
import { EmpleadoRepositoryHttpImplementation } from "../../repositories/empleados.repository.http.implementation";

import { Departamentos, Empleados } from "@/app/domain/entities";

export async function getDepartamentos(): Promise<Departamentos[]> {
  const fetchaGetAllDepartamentosUseCase = new GetAllDepartamentosUseCase(
    new DepartamentosRepositoryHttpImplementation()
  );
  return await fetchaGetAllDepartamentosUseCase.execute();
}

export async function getEmpleados(): Promise<Empleados[]> {
  const fetchaGetAllEmpleados = new GetallEmpleadosUseCase(
    new EmpleadoRepositoryHttpImplementation()
  );
  return await fetchaGetAllEmpleados.execute();
}
