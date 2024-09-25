import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import ModalDestinatario from "../components/ModalDestinatario";
import ModalRemitente from "../components/ModalRemitente";
import ModalResponsable from "../components/ModalResponsable";
import UseOficioMODAL from "../HooksRecibido/UseOficioRecibidos";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validación con Yup
const validationSchema = Yup.object().shape({
  selection: Yup.string().required("Debes seleccionar una opción"),
  fechaCaptura: Yup.date().required("Fecha Captura es requerida"),
  fechaLimite: Yup.date().required("Fecha Límite es requerida"),
  numeroOficio: Yup.number().required("Número de Oficio es requerido"),
  tema: Yup.string().required("Tema es requerido"),
  observaciones: Yup.string(),
  archivo: Yup.mixed().required("Archivo es requerido"),
  selectedArea: Yup.string().required("Área o Departamento es requerido"),
  remitenteName: Yup.string().required("Nombre del remitente es requerido"),
  destinatarioName: Yup.string().required(
    "Nombre del destinatario es requerido"
  ),
  responsableName: Yup.string().required("Nombre del responsable es requerido"),
  destinatarioType: Yup.string()
    .oneOf(["", "Interno", "Externo"], "Tipo de destinatario inválido")
    .required("Tipo de destinatario es requerido"),
  remitenteType: Yup.string()
    .oneOf(["", "Interno", "Externo"], "Tipo de remitente inválido")
    .required("Tipo de remitente es requirido"),
});

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  datosEmpleados: Empleados[];
  remitentes: remitentes[];
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

export default function ModalOficio({
  isOpen,
  onClose,
  onSave,
  datosEmpleados,
  remitentes,
}: ModalOficioProps) {
  const {
    remitenteType,
    setRemitenteType,
    destinatarioType,
    setDestinatarioType,
    remitenteName,
    destinatarioName,
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
    setDestinatarioName,
    setRemitenteName,
    setResponsableName,
    selectedArea,
    setSelectedArea,
  } = UseOficioMODAL();

  return (
    <Formik
      initialValues={{
        selection: "",
        fechaCaptura: "",
        fechaLimite: "",
        numeroOficio: "",
        tema: "",
        observaciones: "",
        archivo: selectedFile,
        selectedArea: selectedArea || "",
        remitenteName: remitenteName || "",
        destinatarioName: destinatarioName || "",
        responsableName: responsableName || "",
        destinatarioType: destinatarioType || "",
      }}
      validationSchema={Yup.object({
        selection: Yup.string().required("Debes seleccionar una opción"),
        fechaCaptura: Yup.date().required("Fecha Captura es requerida"),
        fechaLimite: Yup.date().required("Fecha Límite es requerida"),
        numeroOficio: Yup.number().required("Número de Oficio es requerido"),
        personaEntrega: Yup.string().required(
          "Persona que entrega es requerida"
        ),
        tema: Yup.string().required("Tema es requerido"),
        //archivo: Yup.mixed().required("Archivo es requerido"),
        selectedArea: Yup.string().required("Área o Departamento es requerido"),
        remitenteName: Yup.string().required(
          "Nombre del remitente es requerido"
        ),
        destinatarioName: Yup.string().required(
          "Nombre del destinatario es requerido"
        ),
        responsableName: Yup.string().required(
          "Nombre del responsable es requerido"
        ),
        destinatarioType: Yup.string()
          .oneOf(["Interno", "Externo"], "Tipo de destinatario inválido")
          .required("Tipo de destinatario es requerido"),
      })}
      validateOnChange={false} // Desactiva la validación en cada cambio
      validateOnBlur={false} // Desactiva la validación en cada desenfoque
      onSubmit={(values, { setErrors, setTouched }) => {
        const errors: { [key: string]: string } = {};

        // Validar campos requeridos
        if (!values.remitenteName)
          errors.remitenteName = "Nombre del remitente es requerido";
        if (!values.destinatarioName)
          errors.destinatarioName = "Nombre del destinatario es requerido";
        if (!values.responsableName)
          errors.responsableName = "Nombre del responsable es requerido";

        // Si hay errores, actualizar el estado y no proceder con el guardado
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          setTouched({
            remitenteName: true,
            destinatarioName: true,
            responsableName: true,
          });
        } else {
          // Lógica de guardado al no haber errores
          onSave();
        }
      }}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
            <div
              className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0 overflow-y-auto"
              style={{ maxHeight: "80vh" }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Ingresar Oficio Recibido
              </h2>

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

                  <div className="flex items-center space-x-3">
                    <label className="flex items-center cursor-pointer">
                      <Field
                        type="radio"
                        name="selection"
                        value="CEA"
                        className="mr-1"
                      />
                      CEA
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <Field
                        type="radio"
                        name="selection"
                        value="SEPRA"
                        className="mr-1"
                      />
                      SEPRA
                    </label>
                  </div>
                  {touched.selection && errors.selection && (
                    <div className="left-0 top-full mt-1 text-red-600 text-sm">
                      {errors.selection}
                    </div>
                  )}

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
                      onInput={(e: { target: { value: string } }) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Solo permite números
                      }}
                    />
                    <ErrorMessage
                      name="numeroOficio"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex-1 mb-4 sm:mb-0">
                    <label className="block mb-2">Fecha Captura</label>
                    <Field
                      name="fechaCaptura"
                      type="date"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <ErrorMessage
                      name="fechaCaptura"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2">Fecha Límite</label>
                    <Field
                      name="fechaLimite"
                      type="date"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <ErrorMessage
                      name="fechaLimite"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                {/* Externo e Interno */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    {/* Nombre del Remitente */}
                    <label className="block mb-2 flex items-center">
                      Nombre del Remitente
                      <div className="ml-4 flex items-center">
                        <Field
                          type="radio"
                          id="remitenteInterno"
                          name="remitenteType"
                          value="Interno"
                          className="mr-2"
                        />
                        <label
                          htmlFor="remitenteInterno"
                          className="cursor-pointer mr-4"
                        >
                          Interno
                        </label>

                        <Field
                          type="radio"
                          id="remitenteExterno"
                          name="remitenteType"
                          value="Externo"
                          className="mr-2"
                        />
                        <label
                          htmlFor="remitenteExterno"
                          className="cursor-pointer"
                        >
                          Externo
                        </label>
                      </div>
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
                    </div>
                    {touched.remitenteName && errors.remitenteName && (
                      <div className="text-red-600">{errors.remitenteName}</div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    {/* Nombre del Destinatario */}
                    <label className="block mb-2 flex items-center">
                      Nombre del destinatario
                      <div className="ml-4 flex items-center">
                        <Field
                          type="radio"
                          id="destinatarioInterno"
                          name="destinatarioType"
                          value="Interno"
                          className="mr-2"
                        />
                        <label
                          htmlFor="destinatarioInterno"
                          className="cursor-pointer mr-4"
                        >
                          Interno
                        </label>

                        <Field
                          type="radio"
                          id="destinatarioExterno"
                          name="destinatarioType"
                          value="Externo"
                          className="mr-2"
                        />
                        <label
                          htmlFor="destinatarioExterno"
                          className="cursor-pointer"
                        >
                          Externo
                        </label>
                      </div>
                    </label>
                    {touched.destinatarioType && errors.destinatarioType && (
                      <div className="text-red-600">
                        {errors.destinatarioType}
                      </div>
                    )}

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
                        <div className="text-red-600">
                          {errors.destinatarioName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nombre del Responsable */}
                  <div className="flex flex-col sm:col-span-2 sm:flex-row justify-end">
                    <div className="flex flex-col sm:w-1/2">
                      <label className="block mb-2">
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
                      {values.responsableName === "" && (
                        <ErrorMessage
                          name="responsableName"
                          component="div"
                          className="text-red-600"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Tema */}
                <div className="flex mb-4">
                  <Field
                    name="tema"
                    type="text"
                    placeholder="Tema"
                    className="border border-gray-300 rounded p-2 w-full text-sm"
                  />
                  <ErrorMessage
                    name="tema"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                {/* Observaciones */}
                <div className="mb-4">
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
                  <ErrorMessage
                    name="observaciones"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                {/* Adjuntar Archivo */}
                <div className="flex items-center mb-4">
                  <input
                    id="archivo"
                    name="archivo"
                    type="file"
                    // onChange={(event) => {
                    //   if (event.currentTarget.files) {
                    //     setFieldValue("archivo", event.currentTarget.files[0]);
                    //   }
                    // }}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <ErrorMessage
                    name="archivo"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
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

              {showDestinatarioModal && (
                <ModalDestinatario
                  isOpen={showDestinatarioModal}
                  onClose={() => setShowDestinatarioModal(false)}
                  onSave={(datosEmpleados) => {
                    // Aquí estamos guardando solo el nombre del destinatario
                    const nombreDestinatario = datosEmpleados.nombreCompleto; // O la propiedad que almacene el nombre
                    setDestinatarioName(nombreDestinatario);
                    setFieldValue("destinatarioName", nombreDestinatario);
                    setShowDestinatarioModal(false);
                  }}
                  datosEmpleados={datosEmpleados}
                />
              )}

              {showRemitenteModal && (
                <ModalRemitente
                  isOpen={showRemitenteModal}
                  onClose={() => setShowRemitenteModal(false)}
                  onSave={(remitente) => {
                    const nombreRemitente = remitente.nombre; // O la propiedad que almacene el nombre
                    setRemitenteName(remitente.nombre); // Asegúrate de asignar solo el nombre del objeto Remitente
                    setFieldValue("remitenteName", remitente.nombre); // Asigna el nombre, no el objeto completo
                    setShowRemitenteModal(false);
                  }}
                  remitentes={remitentes}
                />
              )}

              {showResponsableModal && (
                <ModalResponsable
                  isOpen={showResponsableModal}
                  onClose={() => setShowResponsableModal(false)}
                  onSave={(datosEmpleados) => {
                    const nombreResposableEnvio = datosEmpleados.nombreCompleto; // O la propiedad que almacene el nombre
                    setResponsableName(datosEmpleados.nombreCompleto);
                    setFieldValue(
                      "responsableName",
                      datosEmpleados.nombreCompleto
                    );
                    setShowResponsableModal(false);
                  }}
                  datosEmpleados={datosEmpleados}
                />
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
