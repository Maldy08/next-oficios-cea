import { useEffect, useState } from "react";

export default function UseOficioMODAL() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  // Abrir modal con tipo
  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setModalType(null);
  };

  // Guardar cambios y cerrar modal
  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

  const [remitenteType, setRemitenteType] = useState("");
  const [destinatarioType, setDestinatarioType] = useState("");
  const [remitenteName, setRemitenteName] = useState<string | null>(null);
  const [destinatarioName, setDestinatarioName] = useState<string | null>(null);
  const [responsableName, setResponsableName] = useState<string | null>(null);
  const [remSiglas, setRemSiglas] = useState<string | null>(null); 
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedArea, setSelectedArea] = useState("");

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
    setShowDestinatarioModal(false);
  };

  const handleResponsableSave = (name: string) => {
    setResponsableName(name);
    setShowResponsableModal(false);
  };

  const handleRemitenteSave = (name: string, siglas: string) => {
    setRemitenteName(name);
    setRemSiglas(siglas); // Guardar las siglas del remitente
    setShowRemitenteModal(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  return {
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
    remSiglas, // Exponer remSiglas
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
    handleSelectChange,
    setRemSiglas, // Exponer setter de remSiglas
  };
}
