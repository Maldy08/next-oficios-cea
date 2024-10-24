import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { OficiosResponsableRepository } from "../../interfaces/oficios-responsable.interface.repository";


export class CreateOficioResponsableUseCase {
    constructor(private oficiosResponsableRepository: OficiosResponsableRepository) { }

    async execute(oficioResponsable : OficioResponsable[]): Promise<void> {
        return this.oficiosResponsableRepository.createOficioResponsable(oficioResponsable);
    }

}