import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import TableComponente from '../../oficios-expedidos/components/tablecomponente'; 
import { useModal } from '../../oficios-expedidos/Hooks/useModal'; 
import * as Yup from 'yup';
import axios from 'axios';  // Para hacer llamadas a las APIs
import { useFormik } from 'formik';
import { OficioUsuExterno } from '@/app/domain/entities';

interface Empleado {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number; // Suponiendo que este es un identificador
  destSiglas: string; // Suponiendo que este es el campo correcto para siglas
}

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: { nombre: string; destDepen: string; destCargo: string; destSiglas: number }) => void;
  datosEmpleados  : Empleado[];
  datosUsuariosExt : OficioUsuExterno[];
  destinatarioType : string;
}

// Asegúrate de que las columnas coincidan con las propiedades del objeto
const columnsInterno = ['Nombre Completo', 'Departamento', 'Puesto'];
const columnsExterno = ['Nombre', 'Empresa', 'Cargo', 'Siglas'];

const accessor = (item: Empleado | Remitente, column: string) => {
  switch (column) {
    case 'Nombre':
      return 'nombre' in item ? item.nombre : item.nombreCompleto; // Usar nombre o nombreCompleto según el tipo
      case 'Nombre Completo':
      return 'nombreCompleto' in item ? item.nombreCompleto : '';
    case 'Departamento':
      return 'descripcionDepto' in item ? item.descripcionDepto : ''; // Solo para internos
    case 'Puesto':
      return 'descripcionPuesto' in item ? item.descripcionPuesto : ''; // Solo para internos
    case 'Empresa':
      return 'empresa' in item ? item.empresa : ''; // Solo para externos
    case 'Cargo':
      return 'cargo' in item ? item.cargo : item.descripcionPuesto; // Usar cargo o puesto según el tipo
    case 'Siglas':
      return 'siglas' in item ? item.siglas : item.destSiglas; // Usar siglas o destSiglas según el tipo
    default:
      return '';
  }
};



// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  selectedDestinatario: Yup.string().required('Debes seleccionar un destinatario'),
  tipoDestinatario: Yup.string().required('Debes seleccionar el tipo de destinatario'),
});

const ModalDestinatario = (props: ModalDestinatarioProps) => {
  const [datosEmpleados, setDatosEmpleados] = useState<Empleado[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log(props.destinatarioType)
  console.log(props.datosUsuariosExt)
  
  // Inicialización de formik
  const formik = useFormik({
    initialValues: {
      selectedDestinatario: '',
      tipoDestinatario: '',
    },
    validationSchema,
    onSubmit: () => {
      // Implementación de la función de submit
    },
  });

  // Definir las columnas dinámicamente dentro del componente
  const columns = props.destinatarioType === 'interno' ? columnsInterno : columnsExterno;

  const { searchTerm, setSearchTerm } = useModal({
    data: datosEmpleados,
    columnsToFilter: ['nombreCompleto', 'descripcionDepto', 'descripcionPuesto'],
  });


  const handleSave = () => {
    const { selectedDestinatario } = formik.values;

    if (!selectedDestinatario) {
      setError('Debes seleccionar un destinatario');
      return;
    }

    const empleado = datosEmpleados.find(emp => emp.nombreCompleto === selectedDestinatario);

    if (empleado) {
      props.onSave({
        nombre: empleado.nombreCompleto,
        destDepen: empleado.descripcionDepto,
        destCargo: empleado.descripcionPuesto,
        destSiglas: empleado.idPue,
      });
      props.onClose();
      setError(null);
    } else {
      setError('No se encontró el destinatario seleccionado');
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Destinatario</h2>



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
        <TableComponente<Empleado | OficioUsuExterno>
            data={ props.destinatarioType === 'Interno' ? props.datosEmpleados : props.datosUsuariosExt }
            columns={columns}
            accessor={accessor}
            onRowClick={(nombreCompleto) => {
              formik.setFieldValue('selectedDestinatario', nombreCompleto);
              setError(null);
            }}
            columnKeyForRowClick="Nombre Completo"
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

export default ModalDestinatario;
