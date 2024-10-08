import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TableComponente from '../../oficios-expedidos/components/tablecomponente';
import { useModal } from '../../oficios-expedidos/Hooks/useModal';
import * as Yup from 'yup';
import { OficioUsuExterno } from '@/app/domain/entities';
import { useFormik } from 'formik';

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
  destSiglas: string;
}

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

interface ModalRemitenteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: { nombre: string; remDepen: string; remCargo: string; remSiglas: string }) => void;
  datosEmpleados: Empleados[]; // Cambiado de datosEmpleados a datosExternos
  datosUsuariosExt: OficioUsuExterno[];
  remitenteType: string;

}

const columnsExterno = ['Nombre Completo', 'Departamento', 'Puesto']; // Cambiado de columnsInterno a columnsExterno
const columnsUsuariosExt = ['Nombre', 'Empresa', 'Cargo', 'Siglas'];

const accessor = (item: Empleados | Remitente, column: string) => {
  const isExterno = 'nombreCompleto' in item;

  switch (column) {
    case 'Nombre':
      return isExterno ? item.nombreCompleto : item.nombre;
    
    case 'Nombre Completo':
      return isExterno ? item.nombreCompleto : '';
    
    case 'Empresa':
      return !isExterno ? item.empresa : item.descripcionDepto;
    
    case 'Cargo':
      return !isExterno ? item.cargo : item.descripcionPuesto;
    
    case 'Siglas':
      return !isExterno ? item.siglas : 'CEA';
    
    default:
      return '';
  }
};

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  selectedRemitente: Yup.string().required('Debes seleccionar un remitente'),
  tipoRemitente: Yup.string().required('Debes seleccionar el tipo de remitente'),
});

const ModalRemitente = (props: ModalRemitenteProps) => {
  const [error, setError] = useState<string | null>(null);

  // Inicialización de formik
  const formik = useFormik({
    initialValues: {
      selectedRemitente: '',
      tipoRemitente: '',
    },
    validationSchema,
    onSubmit: () => {
      // Implementación de la función de submit
    },
  });

  // Definir las columnas dinámicamente dentro del componente
  const columns = props.remitenteType === 'externo' ? columnsExterno : columnsUsuariosExt;

  const { searchTerm, setSearchTerm } = useModal({
    data: props.datosEmpleados,
    columnsToFilter: ['nombreCompleto', 'descripcionDepto', 'descripcionPuesto'],
  });

  // Función para manejar la selección de remitente
  const handleRowClick = (rowData: Empleados | OficioUsuExterno) => {
    const nombreCompleto = 'nombreCompleto' in rowData ? rowData.nombreCompleto : rowData.nombre; // Obtener nombre del destinatario
    formik.setFieldValue('selectedRemitente', nombreCompleto);
    setError(null);
  };

  // Función para guardar el remitente
  const handleSave = () => {
    const { selectedRemitente } = formik.values;
  
    if (!selectedRemitente) {
      setError('Debes seleccionar un remitente');
      return;
    }
  
    // Busca en datos externos
    const externo = props.datosEmpleados.find(ext => ext.nombreCompleto === selectedRemitente);
  
    // Busca en usuarios externos si no es un externo
    const usuarioExterno = props.datosUsuariosExt.find(user => user.nombre === selectedRemitente);
  
    if (externo) {
      // Guardar destinatario externo
      console.log('Guardando externo:', externo);
      props.onSave({
        nombre: externo.nombreCompleto,
        remDepen: externo.descripcionDepto,
        remCargo: externo.descripcionPuesto,
        remSiglas: "CEA",
      });
      props.onClose(); // Cierra el modal
    } else if (usuarioExterno) {
      // Guardar destinatario usuario externo
      console.log('Guardando usuario externo:', usuarioExterno);
      props.onSave({
        nombre: usuarioExterno.nombre,
        remDepen: usuarioExterno.empresa,
        remCargo: usuarioExterno.cargo,
        remSiglas: usuarioExterno.siglas,
      });
      props.onClose(); // Cierra el modal
    } else {
      setError('No se encontró el remitente seleccionado');
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar remitente</h2>

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
          <TableComponente<Empleados | OficioUsuExterno>
            data={props.remitenteType.toLowerCase() === 'externo' ? props.datosEmpleados : props.datosUsuariosExt}
            columns={columns}
            accessor={accessor}
            onRowClick={(nombre: string, depto: string) => {
              formik.setFieldValue('selectedRemitente', nombre);
              setError(null);
            }}
            columnKeyForRowClick={props.remitenteType === 'externo' ? 'Nombre Completo' : 'Nombre'} // Cambia esto según el tipo de destinatario
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