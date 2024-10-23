import { Oficios } from "@/app/domain/entities";

export interface OficiosRepository {
    getAllOficios(): Promise<Oficios[]>;
    createOficio(oficio: Oficios): Promise<void>;
    updateOficio(oficio: Oficios): Promise<void>; // Nuevo método para actualizar oficios
}


