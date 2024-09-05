import TableComponent from "./components/table";
import ClientComponent from "./components/ClientComponent";
import {
  getDepartamentos,
  getEmpleados,
} from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";

export default async function OficiosExpedidosPage() {
  // Hacer la llamada a la API para obtener los oficios
  const responseOficios = await fetch("http://localhost:3000/api/oficios");
  const dataOficios = await responseOficios.json();
  const rows = dataOficios.data || []; // Datos de oficios para la tabla

  // Hacer la llamada a la API para obtener los departamentos
  const departamentos = await getDepartamentos();

  // const responseDepartamentos = await fetch(
  //   "http://localhost:3000/api/departamentos"
  // );
  // const dataDepartamentos = await responseDepartamentos.json();
  // const departamentos = dataDepartamentos.data || []; // Datos de departamentos para el modal

  // Hacer la llamada a la API para obtener los empleados para el modal de remitente
  // const empleados = await fetch("http://localhost:3000/api/empleados");
  // const empleados2 = await empleados.json();
  // const datosEmpleados = empleados2.data || [];

  const datosEmpleados = await getEmpleados();

  // Hacer la llamada a la API para obtener datos del modal de remitente
  const responseRemitente = await fetch(
    "http://localhost:3000/api/oficiousuext"
  );
  const dataRemitente = await responseRemitente.json();
  const remitentes = dataRemitente.data || [];

  // Renderizar el componente servidor con los datos obtenidos
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficios-Expedidos</h1>

      {/* Renderizamos el componente cliente para manejar la lógica de botones y búsqueda */}
      <ClientComponent
        rows={rows}
        departamentos={departamentos}
        datosEmpleados={datosEmpleados}
        remitentes={remitentes} // Pasar datos del remitente
      />
    </div>
  );
}
