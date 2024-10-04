import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableComponente from '../../oficios-expedidos/components/tablecomponente';
import { useModal } from '../../oficios-expedidos/Hooks/useModal';

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

interface ModalRemitenteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: { remNombre: string; remDepen: string; remCargo: string; remsiglas: string }) => void;
  remitentes: Remitente[]; // Remitentes pasados por props
}

const columns = ['Nombre', 'Empresa', 'Siglas', 'Cargo'];

const accessor = (item: Remitente, column: string) => {
  switch (column) {
    case 'Nombre':
      return item.nombre;
    case 'Empresa':
      return item.empresa;
    case 'Siglas': // Aquí asegúrate que el nombre de la columna sea "SIGLAS"
      return item.siglas; // Aquí se accede a item.remSiglas
    case 'Cargo':
      return item.cargo;
    default:
      return '';
  }
};


const validationSchema = Yup.object().shape({
  selectedRemitente: Yup.string().required('Debes seleccionar un remitente'),
});

const ModalRemitente = (props: ModalRemitenteProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      selectedRemitente: '',
    },
    validationSchema,
    onSubmit: () => {
    },
  });

  const handleSave = () => {
    if (!formik.values.selectedRemitente) {
      setError('Debes seleccionar un destinatario');
    } else {
      // Encuentra el remitente seleccionado a partir del nombre
      const remitente = props.remitentes.find(
        rem => rem.nombre === formik.values.selectedRemitente
      );
  
      if (remitente) {
        // Llama a onSave con los valores requeridos
        props.onSave({
          remNombre: remitente.nombre,
          remDepen: remitente.empresa,
          remCargo: remitente.cargo, // Asegúrate de que este campo esté presente en la interfaz de Empleado
          remsiglas: remitente.siglas,
        });
        props.onClose();
        setError(null); // Limpiar error si se guarda correctamente
      } else {
        setError('No se encontró el destinatario seleccionado');
      }
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
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
              formik.setFieldValue('selectedRemitente', nombre);
              setError(null);
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

export default ModalRemitente;