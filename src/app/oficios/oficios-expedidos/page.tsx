// OficiosExpedidosPage.tsx

import TableComponent from './components/table';
import ClientComponent from './components/ClientComponent';

export default async function OficiosExpedidosPage() {
  // Aqui se hace la llamada API el servidor 
  const response = await fetch('http://localhost:3000/api/oficios');
  const data = await response.json();
  const rows = data.data || []; 

  // Renderizar el componente servidor con los datos de la API
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficios-Expedidos</h1>

      {/* Renderizamos el componente cliente para manejar la lógica de botones y búsqueda */}
      <ClientComponent rows={rows} />
    </div>
  );
}
