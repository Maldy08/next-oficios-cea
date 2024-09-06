import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";
import { getOficioUsuExternos } from "@/app/infrastructure/data-access/oficiousuexterno/get-oficio-usu-externo.data-access";
import { getEmpleados } from "@/app/infrastructure/data-access/empleados/get-empleados";
import { getOficios } from "@/app/infrastructure/data-access/oficios/get-oficios";
import { Departamentos, OficioUsuExterno, Empleados, Oficios } from "@/app/domain/entities";
import ClientComponent from "./components/ClientComponent"; // Ajusta la ruta si es necesario

export default async function PruebasPage() {
    // Usar const para obtener los datos
    const departamentos: Departamentos[] = await getDepartamentos();
    const oficiosExternos: OficioUsuExterno[] = await getOficioUsuExternos();
    const empleados: Empleados[] = await getEmpleados();
    const oficios: Oficios[] = await getOficios();

    return (
        <div className="p-6">
            <h1 className="text-lg font-bold mb-4">Oficio Expedidos</h1>
            
            {/* Pasar los datos al componente cliente */}
            <ClientComponent
                  departamentos={departamentos}   // Los departamentos
                  remitentes={oficiosExternos}     // Los remitentes (oficios externos)
                  datosEmpleados={empleados}       // Los datos de los empleados
                  rows={oficios}                   // Las filas de la tabla (oficios)
            />
        </div>
    );
}
