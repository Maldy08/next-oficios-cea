import { OficiosResponsableRepository } from "@/app/application/interfaces/oficios-responsable.interface.repository";
import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { OficioResponsableMapper } from "../mappers/oficios-responsable.mapper";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";


export class OficioResponsableRepositoryHttpImplementation implements OficiosResponsableRepository {
    async getOficiosResponsableByEjercicioFolioEor(): Promise<OficioResponsable[]> {
        try {
            const { data } = await DbAdapter.get<Result<OficioResponsable[]>>("oficios");
            return data.map((ofresp) => OficioResponsableMapper.mapFromApiToDomain(ofresp));

        } catch (error) {
            console.log(error);
            throw new Error("Error fetching OficiosResponsable")
        }
    }
    async createOficioResponsable(oficioResponsable: OficioResponsable[]): Promise<void> {
        try {
            const data = OficioResponsableMapper.mapFromDomainToApi(oficioResponsable);
            await DbAdapter.post<OficioResponsable>("oficios", data, { headers: { "Content-Type": "multipart/form-data" } });
        }
        catch(error)
        {
            console.log("Error creating oficio responsable from repository:", error);
            throw new Error("Error creating oficio responsable from repository");
        }
    }
}