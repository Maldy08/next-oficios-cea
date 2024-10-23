import { OficioResponsable } from "@/app/domain/entities/oficioResposable";


export interface OficiosResponsableRepository {

    getOficiosResponsableByEjercicioFolioEor(): Promise<OficioResponsable[]>;
}