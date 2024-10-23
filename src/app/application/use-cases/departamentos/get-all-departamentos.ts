import { Departamentos, Empleados } from "@/app/domain/entities";
import {
  DepartamentosRepository,

} from "../../interfaces/departamentos.interface.repository";
import { EmpleadosRepository } from "../../interfaces/empleados.interface.repository";
export class GetAllDepartamentosUseCase {
  constructor(private departamentosRepository: DepartamentosRepository) {}

  async execute(): Promise<Departamentos[]> {
    return this.departamentosRepository.getAllDepartamentos();
  }
}

export class GetallEmpleadosUseCase {
  constructor(private empleadosRepository: EmpleadosRepository) {}

  async execute(): Promise<Empleados[]> {
    return this.empleadosRepository.getAllEmpleados();
  }
}
