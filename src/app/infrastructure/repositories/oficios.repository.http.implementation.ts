import { OficiosRepository } from "@/app/application/interfaces/oficios.interface.repository";
import { Oficios } from "@/app/domain/entities";
import { DbAdapter } from "../adapters/db.adapter";
import { Result } from "@/app/domain/common/result";
import { OficiosMapper } from "../mappers/oficios.mapper";

export class OficioRepositoryHttpImplementation implements OficiosRepository {
  
  // Método para crear un oficio (POST)
  async createOficio(oficio: Oficios): Promise<void> {
    try {
      const data = OficiosMapper.mapFromDomainToApi(oficio);
      await DbAdapter.post<Oficios>("oficios", data, { headers: { "Content-Type": "multipart/form-data" } });
    } catch (error) {
      console.error("Error creating oficio from repository:", error);
      throw new Error("Error creating oficio from repository");
    }
  }

  // Método para actualizar un oficio (PUT)
  async updateOficio(oficio: Oficios): Promise<void> {
    try {
      const data = OficiosMapper.mapFromDomainToApi(oficio);
      // Supongo que usas el folio como identificador único en la URL
      await DbAdapter.put<Oficios>(`oficios/${oficio.folio}`, data, { headers: { "Content-Type": "multipart/form-data" } });
    } catch (error) {
      console.error("Error updating oficio from repository:", error);
      throw new Error("Error updating oficio from repository");
    }
  }

  // Método para obtener todos los oficios (GET)
  async getAllOficios(): Promise<Oficios[]> {
    try {
      const { data } = await DbAdapter.get<Result<Oficios[]>>("oficios");
      return data.map((oficio) => OficiosMapper.mapFromApiToDomain(oficio));
    } catch (error) {
      console.error("Error fetching departamentos from repository:", error);
      throw new Error("Error fetching departamentos from repository");
    }
  }
}
