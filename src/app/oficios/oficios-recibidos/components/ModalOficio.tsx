import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import ModalDestinatario from '../components/ModalDestinatario';
import ModalRemitente from '../components/ModalRemitente';
import ModalResponsable from '../components/ModalResponsable';
import UseModalOficioRecibido from "../HooksRecibido/useModalOficioRecibido";

// Validación con Yup
const validationSchema = Yup.object().shape({
  selection: Yup.string().required("Debes seleccionar una opción"),
  fechaCaptura: Yup.date().required('Fecha Captura es requerida'),
  fechaLimite: Yup.date().required('Fecha Límite es requerida'),
  numeroOficio: Yup.number().required('Número de Oficio es requerido'),
  tema: Yup.string().required('Tema es requerido'),
  observaciones: Yup.string(),
  archivo: Yup.mixed().required('Archivo es requerido'),
  remNombre: Yup.string().required('Nombre del remitente es requerido'),
  destNombre: Yup.string().required('Nombre del destinatario es requerido'),
  responsableName: Yup.string().required('Nombre del responsable es requerido'),
  destinatarioType: Yup.string().oneOf(['', 'Interno', 'Externo'], 'Tipo de destinatario inválido').required('Tipo de destinatario es requerido'),
  remitenteType: Yup.string().oneOf(['', 'Interno', 'Externo'], 'Tipo de remitente inválido').required('Tipo de remitente es requerido'),
});

interface Empleado {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idExterno: number;
  destSiglas: string;
}

interface remitentes {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  datosEmpleados: any[];
  usuariosExternos: any[];
  remitentes: any[];

}

const fetchEmpleadosData = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error en la petición");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
};

export default function ModalOficio({
  isOpen,
  onClose,
  onSave,
  datosEmpleados,
  remitentes,
  usuariosExternos,
}: ModalOficioProps) {
  const {
    remitenteType,
    setRemitenteType,
    destinatarioType,
    setDestinatarioType,
    remNombre,
    destNombre,
    responsableName,
    showDestinatarioModal,
    handleDestinatarioSave,
    handleResponsableSave,
    handleRemitenteSave,
    showRemitenteModal,
    textareaRows,
    showResponsableModal,
    currentDate,
    selectedFile,
    setTextareaRows,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    handleSave,
    setShowDestinatarioModal,
    setShowResponsableModal,
    setShowRemitenteModal,
    handleFileChange,
    setdestNombre,
    setremNombre,  // Cambiado a setremNombre
    destDepen,
    setdestDepen,
    destCargo,
    setdestCargo,
    remDepen,
    setremDepen,
    remCargo,
    setremCargo,
    remsiglas,
    setremsiglas,
    destSiglas,
    setdestSiglas,
    setResponsableName,
  } = UseModalOficioRecibido();




  if (!isOpen) return null;

  return (
    <Formik
      initialValues={{
        folio: '',
        selection: '',
        fechaCaptura: '',
        fechaLimite: '',
        siglas: '',
        cargo: '',
        destDepen: destDepen || '',
        remDepen: remDepen || '',
        destCargo: destCargo || '',
        remCargo: remCargo || '',
        destSiglas: destSiglas || '',
        remsiglas: remsiglas || '',
        numeroOficio: '',
        tema: '',
        observaciones: '',
        archivo: selectedFile,
        remNombre: remNombre || '',  // Esta parte está bien
        destNombre: destNombre || '',
        responsableName: responsableName || '',
        destinatarioType: destinatarioType || '',
        remitenteType: remitenteType || ''
      }}

      validationSchema={validationSchema}
      validateOnChange={false} // Desactivar validación en cada cambio
      validateOnBlur={false} // Desactivar validación en cada desenfoque
      onSubmit={async (values, { setErrors, setTouched }) => {
        const errors: { [key: string]: string } = {};

        if (!values.remNombre) errors.remNombre = 'Nombre del remitente es requerido';
        if (!values.destNombre) errors.destNombre = 'Nombre del destinatario es requerido';
        if (!values.responsableName) errors.responsableName = 'Nombre del responsable es requerido';

        // Si hay errores, se actualizan y no se envía el formulario
        if (Object.keys(errors).length) {
          setErrors(errors);
          setTouched({
            // Marcar campos como tocados
          });
        } else {
          // Crear el objeto JSON
          const objetoOficio = {
            ejercicio: 2024,
            folio: parseInt(values.folio, 10) || 0,
            eor: 2,
            tipo: 0,
            noOficio: values.numeroOficio,
            pdfpath: null, // Enviar como null
            fecha: new Date().toISOString(),
            fechaCaptura: new Date().toISOString(),
            fechaAcuse: new Date().toISOString(),
            fechaLimite: values.fechaLimite,
            remDepen: values.remDepen, // Asignar según tu lógica
            remSiglas: values.remsiglas, // Campo remSiglas añadido
            remNombre: values.remNombre,  // Cambiado a "string"
            remCargo: values.remCargo, // Asignar según tu lógica
            destDepen: values.destDepen, // Asignar según tu lógica
            destSiglas: "string", // Asignar según tu lógica
            destNombre: values.destNombre,
            destCargo: values.destCargo, // Asignar según tu lógica
            tema: values.tema,
            estatus: 0,
            empqentrega: 0,
            relacionoficio: "string", // Asignar según tu lógica
            depto: 0,
            deptoRespon: 0
          };

          // Enviar el objeto a la API
          try {
            const response = await fetch('http://200.56.97.5:7281/api/Oficios', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(objetoOficio),
            });

            if (!response.ok) {
              throw new Error('Error en la solicitud');
            }

            onSave(); // Llama a la función onSave si es necesario
          } catch (error) {
            console.error('Error al guardar el oficio:', error);
          }
        }
      }}
    >
      {({ setFieldValue, values, errors, touched }) => (
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
                    id="numeroOficio"
                    name="numeroOficio"
                    type="text"
                    placeholder="Número de oficio"
                    className="border border-gray-300 rounded p-2 w-full"
                    onInput={(e: { target: { value: string; }; }) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Solo permite números
                    }}
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

                  {/* Barra de texto de remitente */}
                  <div className="relative flex items-center">
                    <Field
                      id="remNombre"
                      name="remNombre"
                      type="text"
                      placeholder="Nombre del remitente"
                      className="border border-gray-300 rounded p-2 w-full"
                      readOnly
                      value={values.remNombre}
                      onClick={() => setShowRemitenteModal(true)}
                    />
                    <FaUserPlus
                      onClick={() => setShowRemitenteModal(true)}
                      className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    />
                  </div>

                  {touched.remNombre && errors.remNombre && (
                    <div className="text-red-600">{errors.remNombre}</div>
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
                      id="destNombre"
                      name="destNombre"
                      type="text"
                      placeholder="Nombre del destinatario"
                      className="border border-gray-300 rounded p-2 w-full"
                      readOnly
                      value={values.destNombre}
                      onMouseDown={(e: { preventDefault: () => void; }) => {
                        // Evitar que el campo reciba el foco si no hay tipo de destinatario
                        if (!values.destinatarioType) {
                          e.preventDefault(); // Previene el foco en el campo
                          alert('Por favor, selecciona primero un tipo de destinatario.');
                        }
                      }}
                      onClick={() => {
                        if (values.destinatarioType) {
                          setShowDestinatarioModal(true);
                        }
                      }}
                    />
                    <FaUserPlus
                      onClick={() => {
                        // Solo abrir el modal si se ha seleccionado un tipo de destinatario
                        if (values.destinatarioType) {
                          setShowDestinatarioModal(true);
                        } else {
                          // Aquí puedes agregar un mensaje si deseas avisar al usuario
                          alert('Por favor, selecciona primero un tipo de destinatario.');
                        }
                      }}
                      className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    />
                  </div>

                  {touched.destNombre && errors.destNombre && (
                    <div className="text-red-600">{errors.destNombre}</div>
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
                >
                  Guardar
                </button>
              </div>
            </div>

            {/* Modales */}
            {showDestinatarioModal && (
              <ModalDestinatario
                isOpen={showDestinatarioModal}
                onClose={() => setShowDestinatarioModal(false)}
                datosEmpleados={datosEmpleados}
                datosUsuariosExt={usuariosExternos}
                destinatarioType={values.destinatarioType}
                onSave={(values) => {
                  setdestNombre(values.nombre);
                  setdestDepen(values.destDepen);
                  setdestCargo(values.destCargo);
                  setdestSiglas(values.destSiglas);

                  setShowDestinatarioModal(false);
                  setFieldValue('destNombre', values.nombre);
                  setFieldValue('destDepen', values.destDepen);
                  setFieldValue('destCargo', values.destCargo);
                  setFieldValue('destSiglas', values.destSiglas);
                }}
              />
            )}




            {showRemitenteModal && (
              <ModalRemitente
                isOpen={showRemitenteModal}
                onClose={() => setShowRemitenteModal(false)}
                datosEmpleados={datosEmpleados}
                datosUsuariosExt={usuariosExternos}
                remitenteType={values.remitenteType}
                onSave={(values) => {
                  setremNombre(values.nombre);
                  setremDepen(values.remDepen);
                  setremCargo(values.remCargo);
                  setremsiglas(values.remSiglas);
                  setShowDestinatarioModal(false);
                  setFieldValue('remNombre', values.nombre);
                  setFieldValue('remDepen', values.remDepen);
                  setFieldValue('remCargo', values.remCargo);
                  setFieldValue('remsiglas', values.remSiglas);         
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
                datosEmpleados={datosEmpleados}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
