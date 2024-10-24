import { OficioResponsable } from "@/app/domain/entities/oficioResposable";


export class OficioResponsableMapper {
    static mapFromApiToDomain(result: OficioResponsable): OficioResponsable {
        return {
          ejercicio: result.ejercicio,
          folio: result.folio,
          eor: result.eor,
          rol: result.rol,
          idEmpleado: result.idEmpleado
        };
      }

      static mapFromDomainToApi(oficioResponsable: OficioResponsable[] ): Record<string, any>[] {
        return oficioResponsable.map((ofresp) => ({
          
          ejercicio: ofresp.ejercicio,
          folio: ofresp.folio,
          eor: ofresp.eor,
          rol: ofresp.rol,
          idEmpleado: ofresp.idEmpleado
        }));
      }
}