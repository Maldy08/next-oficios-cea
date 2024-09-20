import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TableComponente from '../components/tablecomponente';

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  remitentes: Remitente[];
}

const columns = [
  'Nombre',
  'Empresa',
  'Cargo'
];

const accessor = (item: Remitente, column: string) => {
  switch (column) {
    case 'Nombre':
      return item.nombre;
    case 'Empresa':
      return item.empresa;
    case 'Cargo':
      return item.cargo;
    default:
      return '';
  }
};

const ModalRemitenteEnvio = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRemitente, setSelectedRemitente] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!selectedRemitente) {
      setError('Debes seleccionar un remitente');
    } else {
      props.onSave(selectedRemitente);
      props.onClose();
      setError(null); // Limpiar error si se guarda correctamente
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Remitente</h2>
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
          <TableComponente<Remitente>
            data={props.remitentes}
            columns={columns}
            accessor={accessor}
            onRowClick={(nombre) => {
              setSelectedRemitente(nombre);
              setError(null); // Limpiar error al seleccionar un remitente
            }}
            columnKeyForRowClick="Nombre"
            searchTerm={searchTerm}
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

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

export default ModalRemitenteEnvio;
