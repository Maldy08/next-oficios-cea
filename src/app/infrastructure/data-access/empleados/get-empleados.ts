import { GetAllEmpleadosUseCase } from "@/app/application/use-cases/empleados/get-all-empleados.use-case";
import { EmpleadoRepositoryHttpImplementation } from "../../repositories/empleados.repository.http.implementation";
import { Empleados } from "@/app/domain/entities";

export async function getEmpleados(): Promise<Empleados[]> {
    const getAllEmpleadosUseCase = new GetAllEmpleadosUseCase(new EmpleadoRepositoryHttpImplementation());
    return await getAllEmpleadosUseCase.execute();
}
