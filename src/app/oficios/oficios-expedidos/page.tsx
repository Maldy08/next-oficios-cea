import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";
import { getOficioUsuExternos } from "@/app/infrastructure/data-access/oficiousuexterno/get-oficio-usu-externo.data-access";
import { getEmpleados } from "@/app/infrastructure/data-access/empleados/get-empleados";
import { getOficios } from "@/app/infrastructure/data-access/oficios/get-oficios";
import {
  Departamentos,
  OficioUsuExterno,
  Empleados,
  Oficios,
} from "@/app/domain/entities";
import ClientComponent from "./components/ClientComponent";
export default async function PruebasPage() {
  // Obtener los datos de manera asíncrona
  const departamentos: Departamentos[] = await getDepartamentos();
  const oficiosExternos: OficioUsuExterno[] = await getOficioUsuExternos();
  const empleados: Empleados[] = await getEmpleados();
  const oficios: Oficios[] = await getOficios();

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficio Expedidos</h1>

      {/* Aquí pasas los datos al componente que maneja la lógica de cliente */}
      <ClientComponent
        departamentos={departamentos}
        remitentes={oficiosExternos}
        datosEmpleados={empleados}
        rows={oficios}
      />
    </div>
  );
}
