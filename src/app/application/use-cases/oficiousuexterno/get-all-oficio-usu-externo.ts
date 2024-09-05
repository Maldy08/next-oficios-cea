// use-cases/oficioUsuExterno/get-all-oficioUsuExterno.use-case.ts
import { OficioUsuExterno } from "@/app/domain/entities";
import { OficioUsuExternoRepository } from "../../interfaces/oficio-usu-externo.interface.repository";

export class GetAllOficioUsuExternoUseCase {
    constructor(private oficioUsuExternoRepository: OficioUsuExternoRepository) { }

    async execute(): Promise<OficioUsuExterno[]> {
        return this.oficioUsuExternoRepository.getAllOficioUsuExternos();
    }
}
