import { OficioUsuExterno } from "@/app/domain/entities";

export interface OficioUsuExternoRepository {
    // Define los métodos que implementará el repositorio
    getAllOficioUsuExternos(): Promise<OficioUsuExterno[]>;
    // getOficioUsuExternoById(id: number): Promise<OficioUsuExterno>;
}
