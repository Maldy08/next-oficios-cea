import { Oficios } from "@/app/domain/entities";

export interface OficiosRepository {
    getAllOficios(): Promise<Oficios[]>; // Método de lectura
    createOficio(oficio: Oficios): Promise<void>; // Método de escritura
}


