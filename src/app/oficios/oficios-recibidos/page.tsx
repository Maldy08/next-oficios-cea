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

import OficiosPage from "./components/OficiosRecibidos";

export default async function OficiosRecibidosPage() {
  const oficiosExternos: OficioUsuExterno[] = await getOficioUsuExternos();
  const empleados: Empleados[] = await getEmpleados();
  

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficio Recibidos</h1>

      <OficiosPage remitentes={oficiosExternos} datosEmpleados={empleados} />
    </div>
  );
}