import { Empleados } from "@/app/domain/entities";

export interface EmpleadosRepository {
  getAllEmpleados(): Promise<Empleados[]>;
}
