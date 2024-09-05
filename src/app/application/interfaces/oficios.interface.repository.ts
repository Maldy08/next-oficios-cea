import { Oficios } from "@/app/domain/entities";

export interface OficiosRepository {
    getAllOficios(): Promise<Oficios[]>;
}