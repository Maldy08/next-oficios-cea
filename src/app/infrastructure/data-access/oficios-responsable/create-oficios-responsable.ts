'use client';

import { CreateOficioResponsableUseCase } from "@/app/application/use-cases/oficios-responsable/create-oficio-responsable.use-case";
import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { OficioResponsableRepositoryHttpImplementation } from "../../repositories/oficio-responsable.repository.http.implementation";


export async function createOficioResponsable(oficioResponsable: OficioResponsable[]): Promise<void> {

    const saveOficioResponsableUseCase = new CreateOficioResponsableUseCase(new OficioResponsableRepositoryHttpImplementation());
    return await saveOficioResponsableUseCase.execute(oficioResponsable);

}
    