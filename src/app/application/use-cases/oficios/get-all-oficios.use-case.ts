import { Oficios } from "@/app/domain/entities";
import { OficiosRepository } from "../../interfaces/oficios.interface.repository";

export class GetAllOficiosUseCase {
    constructor(private oficiosRepository: OficiosRepository) {}

    async execute(): Promise<Oficios[]> {
        return this.oficiosRepository.getAllOficios();
    }
}
