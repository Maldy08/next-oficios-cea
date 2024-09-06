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
import ClientComponent from "./components/ClientComponent"; // Asegúrate de ajustar la ruta si es necesario

export default async function PruebasPage() {
  let departamentos: Departamentos[] = [];
  let oficiosExternos: OficioUsuExterno[] = [];
  let empleados: Empleados[] = [];
  let oficios: Oficios[] = [];

  try {
    departamentos = await getDepartamentos();
    oficiosExternos = await getOficioUsuExternos();
    empleados = await getEmpleados();
    oficios = await getOficios();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Pruebas</h1>

      {/* Pasar los datos al componente cliente */}
      <ClientComponent
        departamentos={departamentos} // Los departamentos que necesitas
        remitentes={oficiosExternos} // Los remitentes (pueden ser oficios externos)
        datosEmpleados={empleados} // Los datos de los empleados
        rows={oficios} // Las filas de la tabla, es decir, los oficios
      />
    </div>
  );
}
