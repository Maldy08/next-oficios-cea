import { Departamentos } from "@/app/domain/entities";

export interface DepartamentosRepository {
    // Define the methods that will be implemented by the repository
    // For example:
      getAllDepartamentos(): Promise<Departamentos[]>;
      //getDepartamentoById(id: number): Promise<Departamentos>;
}