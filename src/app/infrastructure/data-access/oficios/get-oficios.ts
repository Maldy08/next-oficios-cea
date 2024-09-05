import { GetAllOficiosUseCase } from "@/app/application/use-cases/oficios/get-all-oficios.use-case";
import { OficioRepositoryHttpImplementation } from "../../repositories/oficios.repository.http.implementation";
import { Oficios } from "@/app/domain/entities";

export async function getOficios(): Promise<Oficios[]> {
    const fetchAllOficiosUseCase = new GetAllOficiosUseCase(new OficioRepositoryHttpImplementation());
    return await fetchAllOficiosUseCase.execute();
}
