import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import ModalDestinatario from "../components/ModalDestinatario";
import ModalRemitente from "../components/ModalRemitente";
import ModalResponsable from "../components/ModalResponsable";
import UseOficioMODAL from "../HooksRecibido/UseOficioRecibidos";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
  idExterno: number;
  deptoComi: number;
}

interface remitentes {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

// Validación con Yup
const validationSchema = Yup.object().shape({
  tipo: Yup.string().required("Debes seleccionar una opción"),
  fechaCaptura: Yup.date().required("Fecha Captura es requerida"),
  fechaLimite: Yup.date().required("Fecha Límite es requerida"),
  noOficio: Yup.number().required("Número de Oficio es requerido"),
  tema: Yup.string().required("Tema es requerido"),
  observaciones: Yup.string(),
  // pdfpath: Yup.mixed().required("Archivo es requerido"),
  remNombre: Yup.string().required("Nombre del remitente es requerido"),
  destNombre: Yup.string().required("Nombre del destinatario es requerido"),
  responsableName: Yup.string().required("Nombre del responsable es requerido"),
  destinatarioType: Yup.string()
    .oneOf(["", "Interno", "Externo"], "Tipo de destinatario inválido")
    .required("Tipo de destinatario es requerido"),
  // remitenteType: Yup.string()
  //   .oneOf(["", "Interno", "Externo"], "Tipo de remitente inválido")
  //   .required("Tipo de remitente es requerido"),
  // remSiglas: Yup.string().required("Siglas del remitente son requeridas"), // Añadido remSiglas como requerido
});

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
    remitenteOcupacion,
    setRemitenteOcupacion,
    remitenteSiglas,
    setremitenteSiglas,
    remitentePuesto,
    setremitentePuesto,
    destinatarioDepartamento,
    setdestinatarioDepartamento,
    destinatarioPuesto,
    setDestinatarioPuesto,
    destinatarioSiglas,
    setDestinatarioSigla,
    responsableDepto,
    setresponsableDepto,
    responsabledeptoRespon,
    setresponsabledeptoRespon,
  } = UseOficioMODAL();

  return (
    <Formik
      initialValues={{
        folio: "",
        tipo: 0,
        fechaCaptura: "",
        fechaLimite: "",
        noOficio: "",
        observaciones: "",
        pdfpath: null,

        tema: "",
        estatus: 0,
        empqentrega: 0,
        relacionoficio: "",

        selectedArea: selectedArea || "",

        remNombre: remitenteName || "",
        remDepen: remitenteOcupacion || "",
        remSiglas: remitenteSiglas || "",
        remCargo: remitentePuesto || "",

        destNombre: destinatarioName || "",
        destDepen: destinatarioDepartamento || "",
        destCargo: destinatarioPuesto || "",
        destSiglas: destinatarioSiglas || "",

        depto: responsableDepto || "",
        deptoRespon: responsabledeptoRespon || "",
        responsableName: responsableName || "",

        destinatarioType: destinatarioType || "",
        remitenteType: remitenteType || "",
      }}
      validationSchema={validationSchema}
      validateOnChange={false} // Desactivar validación en cada cambio
      validateOnBlur={false} // Desactivar validación en cada desenfoque
      onSubmit={async (values, { setErrors, setTouched }) => {
        const errors: { [key: string]: string } = {};

        if (!values.remNombre)
          errors.remNombre = "Nombre del remitente es requerido";
        if (!values.destNombre)
          errors.destNombre = "Nombre del destinatario es requerido";
        if (!values.responsableName)
          errors.responsableName = "Nombre del responsable es requerido";

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
            folio: values.folio,
            eor: 2,

            // El tipo me fallo en el croops del error de la api
            tipo: values.tipo,
            // Revisar el tipo

            noOficio: values.noOficio,
            pdfpath: null,
            fecha: currentDate,
            fechaCaptura: values.fechaCaptura,
            fechaAcuse: "2024-10-03T07:02:08.170Z",
            fechaLimite: values.fechaLimite,

            remDepen: values.remDepen,
            remSiglas: values.remSiglas,
            remNombre: values.remNombre,
            remCargo: values.remCargo,

            destDepen: values.destDepen,
            destSiglas: "string",
            destNombre: values.destNombre,
            destCargo: values.destCargo,

            tema: values.tema,
            estatus: 1,
            empqentrega: 0,
            relacionoficio: "string",

            // Deptop no tiene valor asignado,
            depto: 8,
            deptoRespon: values.deptoRespon,
          };
          console.log("AQUI JSON");
          console.log(objetoOficio);

          // Enviar el objeto a la API
          try {
            const response = await fetch(
              "http://200.56.97.5:7281/api/Oficios",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(objetoOficio),
              }
            );

            if (!response.ok) {
              throw new Error("Error en la solicitud");
            }

            // Aquí puedes manejar la respuesta
            onSave(); // Llama a la función onSave si es necesario
          } catch (error) {
            console.error("Error al guardar el oficio:", error);
          }
        }
      }}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
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
                        name="tipo"
                        value="0"
                        className="mr-1"
                      />
                      CEA
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <Field
                        type="radio"
                        name="tipo"
                        value="1"
                        className="mr-1"
                      />
                      SEPRA
                    </label>
                  </div>
                  {touched.tipo && errors.tipo && (
                    <div className="left-0 top-full mt-1 text-red-600 text-sm">
                      {errors.tipo}
                    </div>
                  )}

                  <div className="flex items-center">
                    <span className="w-24 sm:w-12">Fecha:</span>
                    <Field
                      name="fecha"
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
                      id="noOficio"
                      name="noOficio"
                      type="text"
                      placeholder="Número de oficio"
                      className="border border-gray-300 rounded p-2 w-full"
                      onInput={(e: { target: { value: string } }) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Solo permite números
                      }}
                    />
                    <ErrorMessage
                      name="noOficio"
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
                      // value={currentDate}
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
                      //   value={currentDate}
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
                    {/* {touched.remitenteType && errors.remitenteType && (
                      <div className="text-red-600">{errors.remitenteType}</div>
                    )} */}
                    <div className="relative">
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
                        id="destNombre"
                        name="destNombre"
                        type="text"
                        placeholder="Nombre del destinatario"
                        className="border border-gray-300 rounded p-2 w-full"
                        readOnly
                        value={values.destNombre}
                        onClick={() => setShowDestinatarioModal(true)}
                      />
                      <FaUserPlus
                        onClick={() => setShowDestinatarioModal(true)}
                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                      />
                      {touched.destNombre && errors.destNombre && (
                        <div className="text-red-600">{errors.destNombre}</div>
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
                    id="observaciones"
                    name="observaciones"
                    placeholder="Observaciones"
                    className="border border-gray-300 rounded p-2 w-full h-24"
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
                    id="pdfpath"
                    name="pdfpath"
                    type="file"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        setFieldValue("pdfpath", event.currentTarget.files[0]);
                      }
                    }}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <ErrorMessage
                    name="pdfpath"
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
                  // En este modal solo me falta por el Dest_Siglas, no estaban en la api
                  isOpen={showDestinatarioModal}
                  onClose={() => setShowDestinatarioModal(false)}
                  onSave={(datosEmpleados) => {
                    // Aquí estamos guardando solo el nombre del destinatario
                    const datosDestinatario = {
                      nombre: datosEmpleados.nombreCompleto, // Nombre del destinatario
                      departamento: datosEmpleados.descripcionDepto, // Empresa o departamento
                      siglas: datosEmpleados.idExterno, // Siglas del destinatario
                      puesto: datosEmpleados.descripcionPuesto, // Cargo del destinatario
                    };

                    // Asigna los datos completos en los campos de Formik
                    setFieldValue("destNombre", datosDestinatario.nombre);
                    setFieldValue("destDepen", datosDestinatario.departamento);
                    setFieldValue("destSiglas", datosDestinatario.siglas);
                    setFieldValue("destCargo", datosDestinatario.puesto);

                    const nombreDestinatario = datosEmpleados.nombreCompleto; // O la propiedad que almacene el nombre
                    setDestinatarioName(nombreDestinatario);
                    setFieldValue("destNombre", nombreDestinatario);
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
                    const datosRemitente = {
                      nombre: remitente.nombre, // Nombre del remitente
                      departamento: remitente.empresa, // Empresa o departamento
                      siglas: remitente.siglas, // Siglas del remitente
                      puesto: remitente.cargo, // Cargo del remitente
                    };
                    const nombreRemitente = remitente.nombre; // O la propiedad que almacene el nombre
                    setRemitenteName(remitente.nombre); // Asegúrate de asignar solo el nombre del objeto Remitente
                    setFieldValue("remNombre", remitente.nombre); // Asigna el nombre, no el objeto completo
                    setShowRemitenteModal(false);

                    setFieldValue("remNombre", datosRemitente.nombre);
                    setFieldValue("remDepen", datosRemitente.departamento);
                    setFieldValue("remSiglas", datosRemitente.siglas);
                    setFieldValue("remCargo", datosRemitente.puesto);
                  }}
                  remitentes={remitentes}
                />
              )}

              {showResponsableModal && (
                <ModalResponsable
                  isOpen={showResponsableModal}
                  onClose={() => setShowResponsableModal(false)}
                  onSave={(datosEmpleados) => {
                    const datosRemitente = {
                      deptoComi: datosEmpleados.deptoComi,
                    };

                    const nombreResposableEnvio = datosEmpleados.nombreCompleto; // O la propiedad que almacene el nombre
                    setResponsableName(datosEmpleados.nombreCompleto);
                    setFieldValue(
                      "responsableName",
                      datosEmpleados.nombreCompleto
                    );
                    setShowResponsableModal(false);

                    setFieldValue("deptoRespon", datosEmpleados.deptoComi);
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
