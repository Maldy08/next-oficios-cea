// repositories/oficioUsuExterno.repository.http.implementation.ts
import { OficioUsuExternoRepository } from "@/app/application/interfaces/oficio-usu-externo.interface.repository";
import { OficioUsuExterno } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { OficioUsuExternoMapper } from "../mappers/oficio-usu-externo.mapper";

export class OficioUsuExternoRepositoryHttpImplementation implements OficioUsuExternoRepository {

    async getAllOficioUsuExternos(): Promise<OficioUsuExterno[]> {
        try {
            const { data } = await DbAdapter.get<Result<OficioUsuExterno[]>>("oficiousuext"); // URL actualizada
            return data.map(oficio => OficioUsuExternoMapper.mapFromApiToDomain(oficio));
        } catch (error) {
            console.error("Error fetching oficio externo from repository:", error);
            throw new Error("Error fetching oficio externo from repository");
        }
    }
}
