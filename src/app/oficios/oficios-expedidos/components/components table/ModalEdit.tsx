import { ChangeEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ModalDestinatarioEnvio,
  ModalRemitenteEnvio,
  ModalResponsableEnvio,
  ModalPersonaEnvio,
  UseModalOficioExpedido,
} from '../..'; // Ajusta la ruta según sea necesario
import { FaSearch, FaUserPlus } from 'react-icons/fa';

interface Departamento {
  idCea: number;
  descripcion: string;
}

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

interface remitentes {
  nombre: string;
  empresa: string;
  cargo: string;
}

interface ModalOficioExpedidoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  departamentos: Departamento[];
  datosEmpleados: Empleados[];
  remitentes: remitentes[];
}

const validationSchema = Yup.object({
  selection: Yup.string().required("Debes seleccionar una opción"),
  fechaCaptura: Yup.date().required('Fecha Captura es requerida'),
  fechaLimite: Yup.date().required('Fecha Límite es requerida'),
  numeroOficio: Yup.number().required('Número de Oficio es requerido'),
  personaEntrega: Yup.string().required('Persona que entrega es requerida'),
  tema: Yup.string().required('Tema es requerido'),
  observaciones: Yup.string(),
  archivo: Yup.mixed().required('Archivo es requerido'),
  selectedArea: Yup.string().required('Área o Departamento es requerido'),
  remitenteName: Yup.string().required('Nombre del remitente es requerido'),
  destinatarioName: Yup.string().required('Nombre del destinatario es requerido'),
  responsableName: Yup.string().required('Nombre del responsable es requerido'),
  destinatarioType: Yup.string().oneOf(['', 'Interno', 'Externo'], 'Tipo de destinatario inválido').required('Tipo de destinatario es requerido'),
});

export default function ModalOficioExpedido({
  isOpen,
  onClose,
  onSave,
  departamentos,
  datosEmpleados,
  remitentes,
}: ModalOficioExpedidoProps) {
  const {
    currentDate,
    selectedFile,
    handleFileChange,
    showDestinatarioModal,
    setShowDestinatarioModal,
    showRemitenteModal,
    setShowRemitenteModal,
    showResponsableModal,
    setShowResponsableModal,
    showPersonaEnvioModal,
    setShowPersonaEnvioModal,
    destinatarioName,
    setDestinatarioName,
    remitenteName,
    setRemitenteName,
    destinatarioType,
    setDestinatarioType,
    responsableName,
    setResponsableName,
    personaEntregaName,
    setPersonaEntregaName,
    selectedArea,
    handleSelectChange,
  } = UseModalOficioExpedido({ departamentos });

  if (!isOpen) return null;

  return (
    <Formik
      initialValues={{
        selection: '',
        fechaCaptura: '',
        fechaLimite: '',
        numeroOficio: '',
        personaEntrega: personaEntregaName || '',
        tema: '',
        observaciones: '',
        archivo: selectedFile,
        selectedArea: selectedArea || '',
        remitenteName: remitenteName || '',
        destinatarioName: destinatarioName || '',
        responsableName: responsableName || '',
        destinatarioType: destinatarioType || '',
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setErrors, setTouched }) => {
        const errors: { [key: string]: string } = {};
        
        if (!values.personaEntrega) errors.personaEntrega = 'Persona que entrega es requerida';
        if (!values.remitenteName) errors.remitenteName = 'Nombre del remitente es requerido';
        if (!values.destinatarioName) errors.destinatarioName = 'Nombre del destinatario es requerido';
        if (!values.responsableName) errors.responsableName = 'Nombre del responsable es requerido';

        if (Object.keys(errors).length) {
          setErrors(errors);
          setTouched({
            personaEntrega: true,
            remitenteName: true,
            destinatarioName: true,
            responsableName: true,
          });
        } else {
          onSave();
        }
      }}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
            <div
              className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0"
              style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
              <h2 className="text-lg font-semibold mb-4">Editar Oficio Expedidos</h2>

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
                    <ErrorMessage name="folio" component="div" className="text-red-600" />
                  </div>

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
                    <input
                      type="text"
                      value={currentDate}
                      readOnly
                      className="border border-gray-300 rounded p-2 w-24 sm:w-28 text-sm"
                    />
                  </div>
                </div>

                {/* Área o Departamento y Fechas */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                  <div className="flex-grow mb-4 sm:mb-0">
                    <label htmlFor="areaSelect" className="block mb-2">Área o Departamento</label>
                    <Field
                      as="select"
                      id="areaSelect"
                      name="selectedArea"
                      value={selectedArea}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        handleSelectChange(e);
                        setFieldValue('selectedArea', e.target.value);
                      }}
                      className="border border-gray-300 rounded p-2 w-full text-sm"
                    >
                      <option value="">Selecciona una opción</option>
                      {departamentos.length > 0 ? (
                        departamentos.map((departamento) => (
                          <option key={departamento.idCea} value={departamento.idCea}>
                            {departamento.descripcion}
                          </option>
                        ))
                      ) : (
                        <option value="">No hay departamentos disponibles</option>
                      )}
                    </Field>
                    <ErrorMessage name="selectedArea" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div className="flex-none w-40 mb-4 sm:mb-0">
                    <label className="block mb-2">Fecha Captura</label>
                    <Field
                      name="fechaCaptura"
                      type="date"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <ErrorMessage name="fechaCaptura" component="div" className="text-red-600" />
                  </div>

                  <div className="flex-none w-40">
                    <label className="block mb-2">Fecha Límite</label>
                    <Field
                      name="fechaLimite"
                      type="date"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <ErrorMessage name="fechaLimite" component="div" className="text-red-600" />
                  </div>
                </div>

                {/* Número de Oficio y Persona que lo entrega */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                  <div className="flex-none w-40 mb-4 sm:mb-0">
                    <label htmlFor="numeroOficio" className="block mb-2">Número de Oficio</label>
                    <Field
                      id="numeroOficio"
                      name="numeroOficio"
                      type="text"
                      placeholder="Número de oficio"
                      className="border border-gray-300 rounded p-2 w-full"
                      onInput={(e: { target: { value: string; }; }) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                    />
                    <ErrorMessage name="numeroOficio" component="div" className="text-red-600" />
                  </div>

                    {/* Persona que Entrega */}
    <div className="flex-grow">
      <label htmlFor="personaEntrega" className="block mb-2">
        Persona que Entrega
      </label>
      <div className="relative">
        <Field
          id="personaEntrega"
          name="personaEntrega"
          type="text"
          placeholder="Persona que entrega"
          className="border border-gray-300 rounded p-2 w-full"
          readOnly
          value={values.personaEntrega}
          onClick={() => setShowPersonaEnvioModal(true)}
        />
        <FaSearch
          onClick={() => setShowPersonaEnvioModal(true)}
          className="absolute right-2 top-2 text-gray-400 cursor-pointer"
        />
        {touched.personaEntrega && errors.personaEntrega && (
          <div className="text-red-600">{errors.personaEntrega}</div>
        )}
      </div>
    </div>
    </div>

                {/* Remitente */}
<div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
  <div className="flex-grow">
    <label htmlFor="remitenteName" className="block mb-2">
      Nombre del Remitente
    </label>
    <div className="relative">
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
      {touched.remitenteName && errors.remitenteName && (
        <div className="text-red-600">{errors.remitenteName}</div>
      )}
    </div>
  </div>

  {/* Destinatario */}
  <div className="flex flex-col">
    <label className="block mb-2 flex items-center">
      Nombre del destinatario
      <div className="ml-4 flex items-center">
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
    </label>
    {touched.destinatarioType && errors.destinatarioType && (
      <div className="text-red-600">{errors.destinatarioType}</div>
    )}

    {/* Barra de texto de destinatario */}
    <div className="relative">
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
      {touched.destinatarioName && errors.destinatarioName && (
        <div className="text-red-600">{errors.destinatarioName}</div>
      )}
    </div>
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
                  <label htmlFor="tema" className="block mb-2">Tema</label>
                  <Field
                    id="tema"
                    name="tema"
                    type="text"
                    placeholder="Tema"
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <ErrorMessage name="tema" component="div" className="text-red-600" />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="observaciones" className="block mb-2">Observaciones</label>
                  <Field
                    id="observaciones"
                    name="observaciones"
                    as="textarea"
                    placeholder="Observaciones"
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
                  >
                    Guardar
                  </button>
                </div>
              </div>

              {/* Modales */}
              <ModalDestinatarioEnvio
                isOpen={showDestinatarioModal}
                onClose={() => setShowDestinatarioModal(false)}
                onSave={(nombre) => {
                  setDestinatarioName(nombre);
                  setFieldValue('destinatarioName', nombre);
                  setShowDestinatarioModal(false);
                }}
                datosEmpleados={datosEmpleados}
              />
              <ModalRemitenteEnvio
                isOpen={showRemitenteModal}
                onClose={() => setShowRemitenteModal(false)}
                onSave={(nombre) => {
                  setRemitenteName(nombre);
                  setFieldValue('remitenteName', nombre);
                  setShowRemitenteModal(false);
                }}
                remitentes={remitentes}
              />
              <ModalResponsableEnvio
                isOpen={showResponsableModal}
                onClose={() => setShowResponsableModal(false)}
                onSave={(nombre) => {
                  setResponsableName(nombre);
                  setFieldValue('responsableName', nombre);
                  setShowResponsableModal(false);
                }}
                datosEmpleados={datosEmpleados}
              />
              <ModalPersonaEnvio
                isOpen={showPersonaEnvioModal}
                onClose={() => setShowPersonaEnvioModal(false)}
                onSave={(nombre) => {
                  setPersonaEntregaName(nombre);
                  setFieldValue('personaEntrega', nombre);
                  setShowPersonaEnvioModal(false);
                }}
                datosEmpleados={datosEmpleados}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
