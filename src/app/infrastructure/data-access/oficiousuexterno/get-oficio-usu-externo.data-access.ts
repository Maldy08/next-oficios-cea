// data-access/oficioUsuExterno/get-oficioUsuExternos.data-access.ts
import { GetAllOficioUsuExternoUseCase } from "@/app/application/use-cases/oficiousuexterno/get-all-oficio-usu-externo";
import { OficioUsuExternoRepositoryHttpImplementation } from "../../repositories/oficio-usu-externo.repository.http.implementation";
import { OficioUsuExterno } from "@/app/domain/entities";

export async function getOficioUsuExternos(): Promise<OficioUsuExterno[]> {
    const fetchAllOficioUsuExternoUseCase = new GetAllOficioUsuExternoUseCase(new OficioUsuExternoRepositoryHttpImplementation());
    return await fetchAllOficioUsuExternoUseCase.execute();
}
