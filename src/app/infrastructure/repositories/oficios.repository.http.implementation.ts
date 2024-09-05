import { OficiosRepository } from "@/app/application/interfaces/oficios.interface.repository";
import { Oficios } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { OficiosMapper } from "../mappers/oficios.mapper";

export class OficioRepositoryHttpImplementation implements OficiosRepository {
    async getAllOficios(): Promise<Oficios[]> {
        try{
        const { data } = await DbAdapter.get<Result<Oficios[]>>("oficios");
        return data.map((oficio) => OficiosMapper.mapFromApiToDomain(oficio));
    } catch (error) {
        console.error("Error fetching departamentos from repository:", error);
        throw new Error("Error fetching departamentos from repository");
    }
    }
}