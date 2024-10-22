'use client';

import { CreateOficioUseCase } from "@/app/application/use-cases/oficios/create-oficio.use-case";
import { Oficios } from "@/app/domain/entities";
import { OficioRepositoryHttpImplementation } from "../../repositories/oficios.repository.http.implementation";


export async function createOficio(oficio: Oficios): Promise<void> {

    const saveOficioUseCase = new CreateOficioUseCase(new OficioRepositoryHttpImplementation());
    return await saveOficioUseCase.execute(oficio);
}