import { Departamentos } from "@/app/domain/entities";

export interface DepartamentosRepository {
  
      getAllDepartamentos(): Promise<Departamentos[]>;
      //getDepartamentoById(id: number): Promise<Departamentos>;
}