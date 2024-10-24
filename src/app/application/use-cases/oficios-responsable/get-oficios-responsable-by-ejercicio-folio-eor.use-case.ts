import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { OficiosResponsableRepository } from "../../interfaces/oficios-responsable.interface.repository";


export class GetAllOficiosReponsableByEjercicioFolioEorUseCase {
    constructor(private oficiosResponsableRepository: OficiosResponsableRepository) { }

    async execute(): Promise<OficioResponsable[]> {
        return this.oficiosResponsableRepository.getOficiosResponsableByEjercicioFolioEor();
    }
}