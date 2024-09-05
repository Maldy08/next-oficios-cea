import { Empleados } from "@/app/domain/entities";
import { EmpleadosRepository } from "../../interfaces/empleados.interfaces";

export class GetAllEmpleadosUseCase {
    constructor(private empleadosRepository: EmpleadosRepository) { }

    async execute(): Promise<Empleados[]> {
        return this.empleadosRepository.getAllEmpleados();
    }
}
