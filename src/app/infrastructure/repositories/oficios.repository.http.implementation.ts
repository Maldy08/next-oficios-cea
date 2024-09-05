import { OficiosRepository } from "@/app/application/interfaces/oficios.interface.repository";
import { Oficios } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { OficiosMapper } from "../mappers/oficios.mapper";

export class OficioRepositoryHttpImplementation implements OficiosRepository {

    // Asegúrate de que la ruta aquí sea 'oficios' y no 'oficiousuext'
    async getAllOficios(): Promise<Oficios[]> {
        const { data } = await DbAdapter.get<Result<Oficios[]>>("oficios");

        // Mapea los resultados correctamente
        return data.map((oficio) => OficiosMapper.mapFromApiToDomain(oficio));
    }
}
