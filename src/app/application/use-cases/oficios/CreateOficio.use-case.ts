import { Oficios } from "@/app/domain/entities";
import { OficiosRepository } from "../../interfaces/oficios.interface.repository";

export class CreateOficioUseCase {
    constructor(private oficiosRepository: OficiosRepository) {}

    async execute(oficio: Oficios): Promise<void> {
        return this.oficiosRepository.createOficio(oficio);
    }
}
