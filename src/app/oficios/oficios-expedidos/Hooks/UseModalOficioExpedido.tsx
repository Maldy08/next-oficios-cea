import { useState } from 'react';

interface Departamento {
  idCea: number;
  descripcion: string;
}

const UseModalOficioExpedido = ({ departamentos }: { departamentos: Departamento[] }) => {
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [showPersonaEnvioModal, setShowPersonaEnvioModal] = useState(false);
  const [destinatarioName, setDestinatarioName] = useState('');
  const [remitenteName, setRemitenteName] = useState('');
  const [responsableName, setResponsableName] = useState('');
  const [personaEntregaName, setPersonaEntregaName] = useState('');
  const [destinatarioType, setDestinatarioType] = useState<'Interno' | 'Externo' | ''>('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  const handleSaveDestinatario = (name: string) => {
    setDestinatarioName(name);
    setShowDestinatarioModal(false);
  };

  const handleSaveRemitente = (name: string) => {
    setRemitenteName(name);
    setShowRemitenteModal(false);
  };

  const handleSaveResponsable = (name: string) => {
    setResponsableName(name);
    setShowResponsableModal(false);
  };

  const handleSavePersonaEnvio = (name: string) => {
    setPersonaEntregaName(name);
    setShowPersonaEnvioModal(false);
  };

  return {
    textareaRows,
    setTextareaRows,
    currentDate,
    setCurrentDate,
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
    handleSaveDestinatario,
    handleSaveRemitente,
    handleSaveResponsable,
    handleSavePersonaEnvio,
  };
};

export default UseModalOficioExpedido;
