import { EmpleadosRepository } from "@/app/application/interfaces/empleados.interfaces";
import { Empleados } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { EmpleadosMapper } from "../mappers/empleados.mapper";

export class EmpleadoRepositoryHttpImplementation implements EmpleadosRepository {

    async getAllEmpleados(): Promise<Empleados[]> {
        try {
        const { data } = await DbAdapter.get<Result<Empleados[]>>("empleados");
        return data.map((empleado) => EmpleadosMapper.mapFromApiToDomain(empleado));
    } catch (error) {
        console.error("Error fetching departamentos from repository:", error);
        throw new Error("Error fetching departamentos from repository");
    }
    }
}
