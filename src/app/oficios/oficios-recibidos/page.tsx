import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";
import { getOficioUsuExternos } from "@/app/infrastructure/data-access/oficiousuexterno/get-oficio-usu-externo.data-access";
import { getEmpleados } from "@/app/infrastructure/data-access/empleados/get-empleados";
import { getOficios } from "@/app/infrastructure/data-access/oficios/get-oficios";
import { CreateOficioUseCase } from "@/app/application/use-cases/oficios/CreateOficio.use-case";
import { OficioRepositoryHttpImplementation } from "@/app/infrastructure/repositories/oficios.repository.http.implementation";

import {
  Departamentos,
  OficioUsuExterno,
  Empleados,
  Oficios,
} from "@/app/domain/entities";

import OficiosPage from "./components/OficiosRecibidos";

export default async function OficiosRecibidosPage() {
  const oficiosExternos: OficioUsuExterno[] = await getOficioUsuExternos();
  const empleados: Empleados[] = await getEmpleados();
  const oficios: Oficios[] = await getOficios();

  // Crear una instancia del repositorio
  const oficiosRepository = new OficioRepositoryHttpImplementation();
  
  // Crear una instancia del caso de uso, pasando el repositorio
  const createOficioUseCase = new CreateOficioUseCase(oficiosRepository);

  // Ejemplo de cómo podrías crear un nuevo oficio
  const handleCreateOficio = async (nuevoOficio: Oficios) => {
    await createOficioUseCase.execute(nuevoOficio);
    // Aquí podrías agregar lógica para actualizar la lista de oficios
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficio Recibidos</h1>

      <OficiosPage
        remitentes={oficiosExternos}
        datosEmpleados={empleados}
        rows={oficios}
        onCreateOficio={handleCreateOficio} // Pasas la función de crear oficio
      />
    </div>
  );
}
