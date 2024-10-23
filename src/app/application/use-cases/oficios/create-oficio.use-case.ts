import { Oficios } from "@/app/domain/entities";
import { OficiosRepository } from "../../interfaces/oficios.interface.repository";


export class CreateOficioUseCase {
    constructor(private readonly oficiosRepository: OficiosRepository) {}

    async execute(oficio: Oficios): Promise<void> {
        await this.oficiosRepository.createOficio(oficio);
    }
}