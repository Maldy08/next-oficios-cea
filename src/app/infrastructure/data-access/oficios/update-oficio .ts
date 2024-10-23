import { UpdateOficioUseCase } from "@/app/application/use-cases/oficios/update-oficio.use-case";
import { Oficios } from "@/app/domain/entities";
import { OficioRepositoryHttpImplementation } from "../../repositories/oficios.repository.http.implementation";

export async function updateOficio(oficio: Oficios): Promise<void> {
    const updateOficioUseCase = new UpdateOficioUseCase(new OficioRepositoryHttpImplementation());
    return await updateOficioUseCase.execute(oficio);
}
