import { OficioResponsable } from "@/app/domain/entities/oficioResposable";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function UseOficioMODAL() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  // Abrir modal con tipo
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const validationSchema = Yup.object().shape({
    tipo: Yup.string()
      .oneOf(["", "1", "2"], "Debes seleccionar una opció")
      .required("Debes seleccionar una opción"),
    fechaCaptura: Yup.date().required("Fecha Captura es requerida"),
    // fechaLimite: Yup.date().required("Fecha Límite es requerida"),
    noOficio: Yup.string()
      .matches(
        /^[0-9\-]+$/,
        "El número de oficio solo puede contener números y guiones"
      )
      .required("El número de oficio es requerido"),
    tema: Yup.string().required("Tema es requerido"),
    observaciones: Yup.string(),
    // pdfpath: Yup.mixed().required("Archivo es requerido"),
    remNombre: Yup.string().required("Nombre del remitente es requerido"),
    destNombre: Yup.string().required("Nombre del destinatario es requerido"),
    responsableName: Yup.string().required(
      "Nombre del responsable es requerido"
    ),
    destinatarioType: Yup.string()
      .oneOf(["", "1", "2"], "Tipo de destinatario inválido")
      .required("Tipo de destinatario es requerido"),
    remitenteType: Yup.string()
      .oneOf(["", "1", "2"], "Tipo de remitente inválido")
      .required("Tipo de remitente es requerido"),
    // remSiglas: Yup.string().required("Siglas del remitente son requeridas"), // Añadido remSiglas como requerido
  });

  // Guardar cambios y cerrar modal
  const handleSave = () => {
    //console.log("Datos guardados");
    handleCloseModal();
  };
  const [remitenteType, setRemitenteType] = useState("");
  const [remitenteName, setRemitenteName] = useState<string | null>(null);
  const [remitenteOcupacion, setRemitenteOcupacion] = useState<string | null>(
    null
  );

  const [remitenteSiglas, setremitenteSiglas] = useState<string | null>(null);
  const [remitentePuesto, setremitentePuesto] = useState<string | null>(null);

  const [destinatarioType, setDestinatarioType] = useState<string | null>(null);
  const [destinatarioName, setDestinatarioName] = useState<string | null>(null);
  const [destinatarioDepartamento, setdestinatarioDepartamento] = useState<
    string | null
  >(null);
  const [destinatarioPuesto, setDestinatarioPuesto] = useState<string | null>(
    null
  );

  const [destinatarioSiglas, setDestinatarioSigla] = useState<string | null>(
    null
  );

  const [responsableName, setResponsableName] = useState<string | null>(null);
  const [responsableDepto, setresponsableDepto] = useState<string | null>(null);
  const [responsabledeptoRespon, setresponsabledeptoRespon] = useState<
    string | null
  >(null);

  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [personaEntregaName, setPersonaEntregaName] = useState("");
  const [Empleado, resEmpleado] = useState<number | null>(null);

  const [idEmpleado, setidEmpleado] = useState<string | null>(null);
  const [oficioResponsable, setOficioResponsable] = useState<
    OficioResponsable[]
  >([]);

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

  const handleDestinatarioSave = (name: string) => {
    setDestinatarioName(name);
    console.log("Datos aguardados");
    setShowDestinatarioModal(false);
  };

  const handleResponsableSave = (name: string) => {
    setResponsableName(name);
    console.log("Datos aguardados");
    setShowResponsableModal(false);
  };

  const handleRemitenteSave = (name: string) => {
    setRemitenteName(name);
    console.log("Datos aguardados");
    setShowRemitenteModal(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

     // Estados para el modal de confirmación y valores de Formik
     const [showConfirmModal, setShowConfirmModal] = useState(false);
     const [formikValues, setFormikValues] = useState<any>(null);

  return {
    getCurrentDate,
    personaEntregaName,
    setPersonaEntregaName,
    selectedArea,
    setSelectedArea,
    handleFileChange,
    modalType,
    setModalType,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    handleOpenModal,
    handleCloseModal,
    handleSave,
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
    setShowDestinatarioModal,
    setShowResponsableModal,
    setShowRemitenteModal,
    setDestinatarioName,
    setRemitenteName,
    setResponsableName,
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
    setCurrentDate,
    validationSchema,
    Empleado,
    resEmpleado,
    idEmpleado,
    setidEmpleado,
    oficioResponsable,
    setOficioResponsable,
    openModal,
    setOpenModal,
    edit,
    setEdit,
    showConfirmModal,
    formikValues,
    setShowConfirmModal,
    setFormikValues
  };
}