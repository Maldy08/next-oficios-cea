import { Empleados } from "@/app/domain/entities";

export interface EmpleadosRepository {
    getAllEmpleados(): Promise<Empleados[]>;
    // Puedes añadir otros métodos según sea necesario
}
