import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import ModalDestinatario from "../components/ModalDestinatario";
import ModalRemitente from "../components/ModalRemitente";
import ModalResponsable from "../components/ModalResponsable";
import UseOficioMODAL from "../HooksRecibido/UseOficioRecibidos";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { OficioResponsable } from "@/app/domain/entities/oficioResposable";

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  datosEmpleados: Empleados[];
  remitentes: remitentes[];
  esNuevo: boolean;
  editado: boolean;
  rowData: any;
}
interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  empleado: number;
  deptoComi: number;
}

interface remitentes {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
  deptoComi: number;
  empleado: number;
}

interface ObjetoOficio {
  ejercicio: number;
  folio: string;
  eor: number;
  tipo: string;
  noOficio: string;
  pdfpath: null;
  fecha: string;
  fechaCaptura: string;
  fechaAcuse: string;
  fechaLimite: string;
  remDepen: string;
  remSiglas: string;
  remNombre: string;
  remCargo: string;
  destDepen: string;
  destSiglas: string;
  destNombre: string;
  destCargo: string;
  tema: string;
  estatus: number;
  empqentrega: number;
  relacionoficio: string;
  depto: string;
  deptoRespon: string;
  archivo: string;
}

export default function ModalOficio({
  rowData,
  esNuevo,
  editado,
  isOpen,
  onClose,
  onSave,
  datosEmpleados,
  remitentes,
}: ModalOficioProps) {
  const {
    validationSchema,
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
    setCurrentDate,
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
    getCurrentDate,
    oficioResponsable,
    setOficioResponsable,
  } = UseOficioMODAL();

  if (editado) {
    console.log("Entro a editarrrrr");
    console.log(rowData);
  }
  if (esNuevo) {
    console.log("Entro a nuevoooooooooo");
  }

  let numero1 = 2;
  const handleOficioResponsable = (data: OficioResponsable) => {
    setOficioResponsable((prev) => [
      ...prev,
      {
        idEmpleado: data.idEmpleado,
        rol: data.rol,
        ejercicio: data.ejercicio,
        eor: data.eor,
        folio: data.folio,
      },
    ]);

    console.log(oficioResponsable);
  };

  const datosTabla = {};

  return (
    <Formik
      initialValues={{
        folio: editado ? rowData.folio : 0,
        tipo: editado ? rowData.tipo.toString() : "1", // Convertir a string
        fechaCaptura:
          editado && rowData.fechaCaptura
            ? new Date(rowData.fechaCaptura).toISOString().split("T")[0]
            : getCurrentDate(),
        fechaLimite:
          editado && rowData.fechaLimite
            ? new Date(rowData.fechaLimite).toISOString().split("T")[0]
            : getCurrentDate(),
        noOficio: editado ? rowData.noOficio : "",
        observaciones: editado ? rowData.observaciones : "",
        pdfpath: editado ? rowData.pdfpath : null,
        archivo: editado ? rowData.archivo : null, // Asumes que el archivo es nuevo o se seleccionará al crear o editar
        tema: editado ? rowData.tema : "",
        estatus: editado ? rowData.estatus : 0,
        empqentrega: editado ? rowData.empqentrega : 0,
        relacionoficio: editado ? rowData.relacionoficio : "",
        selectedArea: editado ? rowData.selectedArea : "",
        remNombre: editado ? rowData.remNombre : "",
        remDepen: editado ? rowData.remDepen : "",
        remSiglas: editado ? rowData.remSiglas : "",
        remCargo: editado ? rowData.remCargo : "",
        destNombre: editado ? rowData.destNombre : "",
        destDepen: editado ? rowData.destDepen : "",
        destCargo: editado ? rowData.destCargo : "",
        destSiglas: editado ? rowData.destSiglas : "",
        depto: editado ? rowData.depto : "",
        deptoRespon: editado ? rowData.deptoRespon : "",
        responsableName: editado ? rowData.nombreResponsable : "",
        destinatarioType: editado ? "1" : "2", // Interno por defecto en editado
        remitenteType: editado ? "2" : "1", // Externo por defecto en editado

        //nombreResponsable: "",
      }}
      validationSchema={validationSchema}
      validateOnChange={false} // Desactivar validación en cada cambio
      validateOnBlur={false} // Desactivar validación en cada desenfoque
      onSubmit={async (values, { setErrors, setTouched }) => {
        const errors: { [key: string]: string } = {};

        if (numero1 > 1) {
        }

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
          // Lógica para cambiar los valores según el remitenteType
          let remSiglas = values.remSiglas;
          let remDepen = values.remDepen;
          let destDepen = values.destDepen;
          let destSiglas = values.destSiglas;

          if (values.remitenteType === "1" && values.tipo == "1") {
            remSiglas = "CEA";
            remDepen = "COMISION ESTATAL DEL AGUA";
          }

          if (values.destinatarioType === "1" && values.tipo == "1") {
            destDepen = "COMISION ESTATAL DEL AGUA";
            destSiglas = "CEA";
          }

          if (values.remitenteType === "1" && values.tipo == "2") {
            remSiglas = "SEPROA";
            destSiglas = "CEA";
            remDepen =
              "SECRETARÍA PARA EL MANEJO, SANEAMIENTO Y PROTECCIÓN DEL AGUA DE BAJA CALIFORNIA";
          }

          if (values.destinatarioType === "1" && values.tipo == "2") {
            destDepen =
              "SECRETARÍA PARA EL MANEJO, SANEAMIENTO Y PROTECCIÓN DEL AGUA DE BAJA CALIFORNIA";
          }

          const objetoOficio = {
            ejercicio: 2024,
            folio: values.folio,
            eor: 2,
            tipo: values.tipo,
            noOficio: values.noOficio,
            pdfpath: null,
            fecha: currentDate,
            fechaCaptura: values.fechaCaptura,
            fechaAcuse: "2024-10-03T07:02:08.170Z",
            fechaLimite: values.fechaLimite,
            remDepen: remDepen,
            remSiglas: remSiglas,
            remNombre: values.remNombre,
            remCargo: values.remCargo,
            destDepen: destDepen,
            destSiglas: destSiglas,
            destNombre: values.destNombre,
            destCargo: values.destCargo,
            tema: values.tema,
            estatus: 1,
            empqentrega: 0,
            relacionoficio: "string",
            depto: values.depto,
            deptoRespon: values.deptoRespon,
            archivo: values.archivo,
          };

          // Enviar el objeto a la API

          console.log("Aqui est el json");
          console.log(objetoOficio);
          console.log("Aqui el arreglo");
          console.log(oficioResponsable);

          try {
            // Primer POST: Enviar objeto JSON usando FormData (sin modificar objetoOficio)
            const formData = new FormData();

            (Object.keys(objetoOficio) as (keyof ObjetoOficio)[]).forEach(
              (key) => {
                const value = objetoOficio[key];
                if (value !== null && value !== undefined) {
                  formData.append(key, value.toString());
                }
              }
            );

            if (values.archivo) {
              formData.append("archivo", values.archivo);
            }

            const response = await fetch(
              "http://200.56.97.5:7281/api/Oficios",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!response.ok) {
              throw new Error(
                "Error en la solicitud al enviar los datos generales."
              );
            }

            const data = await response.json();
            console.log("Datos generales enviados correctamente:", data);

            // Segundo POST: Enviar el arreglo oficioResponsable
            const responseArray = await fetch(
              "http://200.56.97.5:7281/api/OficioResponsable/CreateOficioResponsable",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(oficioResponsable),
              }
            );

            if (!responseArray.ok) {
              throw new Error(
                "Error en la solicitud al enviar el arreglo oficioResponsable."
              );
            }

            const responseArrayData = await responseArray.json();
            console.log(
              "Arreglo oficioResponsable enviado correctamente:",
              responseArrayData
            );

            // Llamar a la función onSave si ambos POST fueron exitosos
            onSave();
          } catch (error) {
            console.error(
              "Error al guardar el oficio o enviar el arreglo:",
              error
            );
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
              {esNuevo && (
                <h2 className="text-lg font-semibold mb-4">
                  Ingresar Oficio Recibido
                </h2>
              )}
              {editado && (
                <h2 className="text-lg font-semibold mb-4">
                  Editar Oficio Recibido
                </h2>
              )}

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
                        value="1"
                        className="mr-1"
                      />
                      CEA
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <Field
                        type="radio"
                        name="tipo"
                        value="2"
                        className="mr-1"
                      />
                      SEPROA
                    </label>
                  </div>
                  {touched.tipo && errors.tipo && (
                    <div className="text-red-600">
                      {/* Verifica si el error es un string */}
                      {typeof errors.tipo === "string" ? errors.tipo : null}
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
                        e.target.value = e.target.value.replace(
                          /[^0-9\-]/g,
                          ""
                        ); // Solo permite números
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
                    {/* <ErrorMessage
                      name="fechaLimite"
                      component="div"
                      className="text-red-600"
                    /> */}
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
                          value="1"
                          className="mr-2"
                        />
                        <label
                          htmlFor="remitenteInterno"
                          className="cursor-pointer mr-4"
                        >
                          Interno
                        </label>

                        <Field
                          // checked={true}
                          type="radio"
                          id="remitenteExterno"
                          name="remitenteType"
                          value="2"
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
                    {touched.remitenteType && errors.remitenteType && (
                      <div className="text-red-600">
                        {/* Verifica si el error es un string */}
                        {typeof errors.remitenteType === "string"
                          ? errors.remitenteType
                          : null}
                      </div>
                    )}
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
                      <div className="text-red-600">
                        {/* Verifica si el error es un string */}
                        {typeof errors.remNombre === "string"
                          ? errors.remNombre
                          : null}
                      </div>
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
                          value="1"
                          className="mr-2"
                          //  checked={true}
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
                          value="2"
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
                        {/* Verifica si el error es un string */}
                        {typeof errors.destinatarioType === "string"
                          ? errors.destinatarioType
                          : null}
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
                        <div className="text-red-600">
                          {/* Verifica si el error es un string */}
                          {typeof errors.destNombre === "string"
                            ? errors.destNombre
                            : null}
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
                    name="archivo" // Cambiar a archivo para que sea capturado correctamente
                    type="file"
                    accept=".pdf"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        const file = event.currentTarget.files[0];

                        // Validación de tipo de archivo
                        if (file && file.type !== "application/pdf") {
                          alert("Por favor, sube un archivo PDF."); // Mensaje de alerta para el usuario
                          return;
                        }

                        setFieldValue("archivo", file); // Almacenar archivo en values.archivo
                      }
                    }}
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
                {editado && (
                  <button
                    type="submit"
                    className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Editar
                  </button>
                )}

                {esNuevo && (
                  <button
                    type="submit"
                    className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Guardar
                  </button>
                )}

                {/* <h1>Remitentes: {values.remitenteType}</h1>
                <h1>Destinatario: {values.destinatarioType}</h1> */}
              </div>
              {showDestinatarioModal && (
                <ModalDestinatario
                  isOpen={showDestinatarioModal}
                  onClose={() => setShowDestinatarioModal(false)}
                  onSave={(datosEmpleados) => {
                    const datosDestinatario = {
                      nombre:
                        "nombreCompleto" in datosEmpleados
                          ? datosEmpleados.nombreCompleto
                          : datosEmpleados.nombre,
                      departamento:
                        "descripcionDepto" in datosEmpleados
                          ? datosEmpleados.descripcionDepto
                          : datosEmpleados.empresa,
                      siglas:
                        "siglas" in datosEmpleados ? datosEmpleados.siglas : "",
                      puesto:
                        "descripcionPuesto" in datosEmpleados
                          ? datosEmpleados.descripcionPuesto
                          : datosEmpleados.cargo,
                      deptoComi: datosEmpleados.deptoComi || "",
                      empleado: datosEmpleados.empleado || " ",
                    };

                    // Asigna los datos completos en los campos de Formik
                    setFieldValue("destNombre", datosDestinatario.nombre);
                    setFieldValue("destDepen", datosDestinatario.departamento);
                    setFieldValue("destSiglas", datosDestinatario.siglas);
                    setFieldValue("destCargo", datosDestinatario.puesto);
                    setFieldValue("depto", datosDestinatario.deptoComi); // Asigna deptoComi a depto
                    // Si el destinatario es interno, asigna deptoComi también al responsable

                    if (values.destinatarioType === "1") {
                      setFieldValue(
                        "responsableName",
                        datosDestinatario.nombre
                      );

                      setFieldValue("deptoRespon", datosDestinatario.deptoComi); // Asigna deptoComi a deptoRespon
                      setFieldValue("idEmpleado", datosDestinatario.empleado);

                      console.log("entro a destinatario11111");
                    }

                    setShowDestinatarioModal(false);
                  }}
                  tipo={values.tipo.toString()}
                  tipoDestinatario={values.destinatarioType || "1"}
                  remitentes={remitentes}
                  datosEmpleados={datosEmpleados}
                />
              )}
              {showRemitenteModal && (
                <ModalRemitente
                  isOpen={showRemitenteModal}
                  onClose={() => setShowRemitenteModal(false)}
                  onSave={(remitente) => {
                    const datosRemitente = {
                      nombre:
                        "nombreCompleto" in remitente
                          ? remitente.nombreCompleto
                          : remitente.nombre,
                      departamento:
                        "descripcionDepto" in remitente
                          ? remitente.descripcionDepto
                          : remitente.empresa,
                      siglas: "siglas" in remitente ? remitente.siglas : "",
                      puesto:
                        "descripcionPuesto" in remitente
                          ? remitente.descripcionPuesto
                          : remitente.cargo,
                    };

                    setFieldValue("remNombre", datosRemitente.nombre);
                    setFieldValue("remDepen", datosRemitente.departamento);
                    setFieldValue("remSiglas", datosRemitente.siglas);
                    setFieldValue("remCargo", datosRemitente.puesto);

                    setShowRemitenteModal(false);
                  }}
                  tipo={values.tipo.toString()} // Añadimos la propiedad `tipo` aquí
                  tipoRemitente={values.remitenteType || "1"} // Asegúrate de que este valor esté definido correctamente
                  remitentes={remitentes}
                  empleados={datosEmpleados}
                />
              )}
              {showResponsableModal && (
                <ModalResponsable
                  isOpen={showResponsableModal}
                  onClose={() => setShowResponsableModal(false)}
                  handleOficioResponsable={handleOficioResponsable}
                  onSave={(datosEmpleados) => {
                    const datosResponsable = {
                      nombreCompleto: datosEmpleados.nombreCompleto,
                      deptoComi: datosEmpleados.deptoComi, // Aseguramos que deptoComi esté asignado
                      empleado: datosEmpleados.empleado,
                    };

                    // Asigna los datos del responsable al campo correspondiente
                    setResponsableName(datosResponsable.nombreCompleto);
                    setFieldValue(
                      "responsableName",
                      datosResponsable.nombreCompleto
                    );
                    setFieldValue("idEmpleado", datosResponsable.empleado);

                    setFieldValue("deptoRespon", datosResponsable.deptoComi); // Asigna deptoComi a deptoRespon

                    // Si el destinatario es externo, asigna deptoComi también al destinatario
                    if (values.destinatarioType === "2") {
                      setFieldValue("depto", datosResponsable.deptoComi); // Asigna deptoComi a depto
                    }

                    setShowResponsableModal(false);
                  }}
                  // oficioResponsable={[
                  //   {
                  //     ejercicio: 2024,
                  //     folio: values.folio,
                  //     eor: 1,
                  //     idEmpleado: values.idEmpleado,
                  //     rol: 1,
                  //   },
                  // ]}

                  tipo={values.tipo.toString()}
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