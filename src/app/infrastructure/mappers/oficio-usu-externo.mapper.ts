// mappers/oficioUsuExterno.mapper.ts
import { OficioUsuExterno } from "@/app/domain/entities";

export class OficioUsuExternoMapper {
    static mapFromApiToDomain(result: any): OficioUsuExterno {
        return {
            idExterno: result.idExterno,
            empresa: result.empresa,
            siglas: result.siglas,
            nombre: result.nombre,
            cargo: result.cargo,
            fechaCaptura: new Date(result.fechaCaptura),
            activo: result.activo,
        };
    }
}
