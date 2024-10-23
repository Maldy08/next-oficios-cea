import { Oficios } from "@/app/domain/entities";
import { OficiosRepository } from "@/app/application/interfaces/oficios.interface.repository";

export class UpdateOficioUseCase {
    private repository: OficiosRepository;

    constructor(repository: OficiosRepository) {
        this.repository = repository;
    }

    async execute(oficio: Oficios): Promise<void> {
        await this.repository.updateOficio(oficio);
    }
}
