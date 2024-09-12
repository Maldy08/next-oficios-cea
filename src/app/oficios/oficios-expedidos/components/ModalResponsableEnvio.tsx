import { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useModal } from '../Hooks/useModal'; 
import TableComponente from '../components/tablecomponente'; // Importa el componente genérico

interface Empleado {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

interface ModalResponsableEnvioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  datosEmpleados: Empleado[];
}

const columns = ['Nombre Completo', 'Departamento', 'Puesto'];

const accessor = (item: Empleado, column: string) => {
  switch (column) {
    case 'Nombre Completo':
      return item.nombreCompleto;
    case 'Departamento':
      return item.descripcionDepto;
    case 'Puesto':
      return item.descripcionPuesto;
    default:
      return '';
  }
};

const ModalResponsableEnvio = (props: ModalResponsableEnvioProps) => {
  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages
  } = useModal({
    data: props.datosEmpleados,
    columnsToFilter: ['nombreCompleto', 'descripcionDepto', 'descripcionPuesto']
  });

  const [selectedResponsable, setSelectedResponsable] = useState<string | null>(null);

  if (!props.isOpen) return null;

  const handleSave = () => {
    if (selectedResponsable) {
      props.onSave(selectedResponsable);
      props.onClose();
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Responsable</h2>
          <div className="relative w-full max-w-[300px]">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 text-sm rounded-none focus:border-blue-500 focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          <TableComponente<Empleado>
            data={props.datosEmpleados}
            columns={columns}
            accessor={accessor}
            onRowClick={setSelectedResponsable}
            columnKeyForRowClick="Nombre Completo"
            searchTerm={searchTerm}  // Pasar el término de búsqueda
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={props.onClose}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResponsableEnvio;
