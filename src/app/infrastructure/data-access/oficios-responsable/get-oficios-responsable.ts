import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { GetAllOficiosReponsableByEjercicioFolioEorUseCase } from '../../../application/use-cases/oficios-responsable/get-oficios-responsable-by-ejercicio-folio-eor.use-case';
import { OficioResponsableRepositoryHttpImplementation } from "../../repositories/oficio-responsable.repository.http.implementation";


export async function getOficiosResponsableByEjercicioFolioEor(): Promise<OficioResponsable[]> {
    const fetchAllOficiosResponsableUseCase = new GetAllOficiosReponsableByEjercicioFolioEorUseCase(new OficioResponsableRepositoryHttpImplementation());
    return await fetchAllOficiosResponsableUseCase.execute();
}