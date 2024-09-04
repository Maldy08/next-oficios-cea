import { Departamentos } from "@/app/domain/entities";
import { DepartamentosRepository } from "../../interfaces/departamentos.interface.repository";



export class GetAllDepartamentosUseCase {
    constructor(private departamentosRepository: DepartamentosRepository) { }

    async execute(): Promise<Departamentos[]> {
        return this.departamentosRepository.getAllDepartamentos();
    }

    
}