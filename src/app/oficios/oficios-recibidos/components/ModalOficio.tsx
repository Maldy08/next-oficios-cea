import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import ModalDestinatario from '../components/ModalDestinatario';
import ModalRemitente from '../components/ModalRemitente';
import ModalResponsable from '../components/ModalResponsable';

// Validación con Yup
const validationSchema = Yup.object().shape({
  selection: Yup.string().required("Debes seleccionar una opción"),
  fechaCaptura: Yup.date().required('Fecha Captura es requerida'),
  fechaLimite: Yup.date().required('Fecha Límite es requerida'),
  numeroOficio: Yup.number().required('Número de Oficio es requerido'),
  tema: Yup.string().required('Tema es requerido'),
  observaciones: Yup.string(),
  archivo: Yup.mixed().required('Archivo es requerido'),
  selectedArea: Yup.string().required('Área o Departamento es requerido'),
  remitenteName: Yup.string().required('Nombre del remitente es requerido'),
  destinatarioName: Yup.string().required('Nombre del destinatario es requerido'),
  responsableName: Yup.string().required('Nombre del responsable es requerido'),
  destinatarioType: Yup.string().oneOf(['', 'Interno', 'Externo'], 'Tipo de destinatario inválido').required('Tipo de destinatario es requerido'),
  remitenteType: Yup.string().oneOf(['', 'Interno', 'Externo'], 'Tipo de remitente inválido').required('Tipo de remitente es requirido'),
});

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

export default function ModalOficio({ isOpen, onClose, onSave }: ModalOficioProps) {
  const [remitenteType, setRemitenteType] = useState("");
  const [destinatarioType, setDestinatarioType] = useState("");
  const [remitenteName, setRemitenteName] = useState<string | null>(null);
  const [destinatarioName, setDestinatarioName] = useState<string | null>(null);
  const [responsableName, setResponsableName] = useState<string | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      alert("Por favor, selecciona un archivo PDF.");
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  if (!isOpen) return null;

  return (
    <Formik
      initialValues={{
        selection: '',
        fechaCaptura: '',
        fechaLimite: '',
        numeroOficio: '',
        tema: '',
        observaciones: '',
        archivo: selectedFile,
        selectedArea: selectedArea || '',
        remitenteName: remitenteName || '',
        destinatarioName: destinatarioName || '',
        responsableName: responsableName || '',
        destinatarioType: destinatarioType || '',
        remitenteType: remitenteType || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values); // Para verificar
    onSave(values);
    onClose();
  }}
  validateOnChange={false}
  validateOnBlur={false}
    >
      {({ setFieldValue, values,errors, touched, isSubmitting }) => (
        <Form className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0 overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <h2 className="text-lg font-semibold mb-4">Ingresar Oficio Recibido</h2>

            <div className="flex flex-col space-y-4">
              {/* Folio y Selección */}
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-24 sm:space-y-0 sm:space-x-24">
                <div className="flex items-center">
                  <span className="w-24 sm:w-12">Folio:</span>
                  <Field
                    name="folio"
                    type="text"
                    placeholder="Folio"
                    className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-sm"
                  />
                </div>

                {/* Selección */}
                <div className="flex flex-col">
                    <div className="relative">
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center cursor-pointer">
                          <Field type="radio" name="selection" value="CEA" className="mr-1" />
                          CEA
                        </label>

                        <label className="flex items-center cursor-pointer">
                          <Field type="radio" name="selection" value="SEPRA" className="mr-1" />
                          SEPRA
                        </label>
                      </div>
                      {touched.selection && errors.selection && (
                        <div className="absolute left-0 top-full mt-1 text-red-600 text-sm">
                          {errors.selection}
                        </div>
                      )}
                    </div>
                  </div>
                    

                <div className="flex items-center">
                  <span className="w-24 sm:w-12">Fecha:</span>
                  <Field
                    name="fechaCaptura"
                    type="text"
                    value={currentDate}
                    readOnly
                    className="border border-gray-300 rounded p-2 w-24 sm:w-28 text-sm"
                  />
                </div>
              </div>

              {/* Número de Oficio y Fechas */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Número de Oficio</label>
                  <Field
                    name="numeroOficio"
                    type="text"
                    placeholder="Número de Oficio"
                    className="border border-gray-300 rounded p-2 w-full text-sm"
                  />
                  <ErrorMessage name="numeroOficio" component="div" className="text-red-600" />
                </div>
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block mb-2">Fecha Captura</label>
                  <Field
                    name="fechaCaptura"
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <ErrorMessage name="fechaCaptura" component="div" className="text-red-600" />
                </div>
                <div className="flex-1">
                  <label className="block mb-2">Fecha Límite</label>
                  <Field
                    name="fechaLimite"
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <ErrorMessage name="fechaLimite" component="div" className="text-red-600" />
                </div>
              </div>

                      
              {/* Contenedor principal con grid de dos columnas */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
  {/* Remitente */}
  <div className="flex flex-col">
    {/* Título y botones a la derecha */}
    <div className="flex justify-between items-center mb-2">
      <label htmlFor="remitenteName" className="block">
        Nombre del Remitente
      </label>
      <div className="ml-4 flex items-center">
  {/* Radio Button Interno */}
  <Field
    type="radio"
    id="remitenteInterno"
    name="remitenteType"
    value="Interno"
    className="mr-2"
  />
  <label htmlFor="remitenteInterno" className="cursor-pointer mr-4">
    Interno
  </label>

  {/* Radio Button Externo */}
  <Field
    type="radio"
    id="remitenteExterno"
    name="remitenteType"
    value="Externo"
    className="mr-2"
  />
  <label htmlFor="remitenteExterno" className="cursor-pointer">
    Externo
  </label>
</div>

    </div>

    {touched.remitenteType && errors.remitenteType && (
      <div className="text-red-600">{errors.remitenteType}</div>
    )}

    {/* Barra de texto de remitente */}
    <div className="relative flex items-center">
      <Field
        id="remitenteName"
        name="remitenteName"
        type="text"
        placeholder="Nombre del remitente"
        className="border border-gray-300 rounded p-2 w-full"
        readOnly
        value={values.remitenteName}
        onClick={() => setShowRemitenteModal(true)}
      />
      <FaUserPlus
        onClick={() => setShowRemitenteModal(true)}
        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
      />
    </div>

    {touched.remitenteName && errors.remitenteName && (
      <div className="text-red-600">{errors.remitenteName}</div>
    )}
  </div>

  {/* Destinatario */}
  <div className="flex flex-col">
    {/* Título y botones a la derecha */}
    <div className="flex justify-between items-center mb-2">
      <label htmlFor="destinatarioName" className="block">
        Nombre del Destinatario
      </label>
      <div className="flex items-center">
        {/* Radio Button Interno */}
        <Field
          type="radio"
          id="destinatarioInterno"
          name="destinatarioType"
          value="Interno"
          className="mr-2"
        />
        <label htmlFor="destinatarioInterno" className="cursor-pointer mr-4">
          Interno
        </label>

        {/* Radio Button Externo */}
        <Field
          type="radio"
          id="destinatarioExterno"
          name="destinatarioType"
          value="Externo"
          className="mr-2"
        />
        <label htmlFor="destinatarioExterno" className="cursor-pointer">
          Externo
        </label>
      </div>
    </div>

    {touched.destinatarioType && errors.destinatarioType && (
      <div className="text-red-600">{errors.destinatarioType}</div>
    )}

    {/* Barra de texto de destinatario */}
    <div className="relative flex items-center">
      <Field
        id="destinatarioName"
        name="destinatarioName"
        type="text"
        placeholder="Nombre del destinatario"
        className="border border-gray-300 rounded p-2 w-full"
        readOnly
        value={values.destinatarioName}
        onClick={() => setShowDestinatarioModal(true)}
      />
      <FaUserPlus
        onClick={() => setShowDestinatarioModal(true)}
        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
      />
    </div>

    {touched.destinatarioName && errors.destinatarioName && (
      <div className="text-red-600">{errors.destinatarioName}</div>
    )}
  </div>
</div>


              {/* Responsable */}
<div className="flex flex-col sm:col-span-2 sm:flex-row justify-end">
  <div className="flex flex-col sm:w-1/2">
    <label htmlFor="responsableName" className="block mb-2">
      Nombre del Responsable
    </label>
    <div className="relative">
      <Field
        id="responsableName"
        name="responsableName"
        type="text"
        placeholder="Nombre del responsable"
        className="border border-gray-300 rounded p-2 w-full"
        readOnly
        value={values.responsableName}
        onClick={() => setShowResponsableModal(true)}
      />
      <FaUserPlus
        onClick={() => setShowResponsableModal(true)}
        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
      />
    </div>
    {values.responsableName === '' && (
      <ErrorMessage name="responsableName" component="div" className="text-red-600" />
    )}
  </div>
</div>

              {/* Tema y Observaciones */}
              <div className="flex flex-col mb-4">
                <label className="block mb-2">Tema</label>
                <Field
                  name="tema"
                  type="text"
                  placeholder="Tema"
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                />
                <ErrorMessage name="tema" component="div" className="text-red-600" />
              </div>

              <div className="flex flex-col mb-4">
                <label className="block mb-2">Observaciones</label>
                <Field
                  as="textarea"
                  name="observaciones"
                  placeholder="Observaciones"
                  rows={textareaRows}
                  onFocus={() => setTextareaRows(5)}
                  onBlur={() => setTextareaRows(3)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
                <ErrorMessage name="observaciones" component="div" className="text-red-600" />
              </div>

              {/* Archivo */}
  <div className="mb-4">
    <input
      id="archivo"
      name="archivo"
      type="file"
      onChange={(event) => {
        if (event.currentTarget.files) {
          setFieldValue('archivo', event.currentTarget.files[0]);
        }
      }}
      className="border border-gray-300 rounded p-2 w-full"
    />
    <ErrorMessage name="archivo" component="div" className="text-red-600" />
  </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Cancelar
                  </button>
                  <button
                type="submit"
                className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
                disabled={isSubmitting} // Evitar múltiples envíos
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
                </div>
              </div>

            {/* Modales */}
            {showDestinatarioModal && (
              <ModalDestinatario
                isOpen={showDestinatarioModal}
                onClose={() => setShowDestinatarioModal(false)}
                onSave={(name: string) => {
                  setDestinatarioName(name);
                  setShowDestinatarioModal(false);
                  setFieldValue('destinatarioName', name);
                }}
              />
            )}

            {showRemitenteModal && (
              <ModalRemitente
                isOpen={showRemitenteModal}
                onClose={() => setShowRemitenteModal(false)}
                onSave={(name: string) => {
                  setRemitenteName(name);
                  setShowRemitenteModal(false);
                  setFieldValue('remitenteName', name);
                }}
              />
            )}

            {showResponsableModal && (
              <ModalResponsable
                isOpen={showResponsableModal}
                onClose={() => setShowResponsableModal(false)}
                onSave={(name: string) => {
                  setResponsableName(name);
                  setShowResponsableModal(false);
                  setFieldValue('responsableName', name);
                }}
              />
            )}
            </div>
        </Form>
      )}
    </Formik>
  );
}
