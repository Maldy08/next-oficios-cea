import { Empleados } from "@/app/domain/entities";
import { EmpleadosRepository } from "../../interfaces/empleados.interface.repository";


export class GetallEmpleadosUseCase {
  constructor(private empleadosRepository: EmpleadosRepository) {}


  async execute(): Promise<Empleados[]> {
    return this.empleadosRepository.getAllEmpleados();
  }
}
