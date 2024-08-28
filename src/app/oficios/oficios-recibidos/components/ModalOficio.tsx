import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import ModalDestinatario from '../components/ModalDestinatario';
import ModalRemitente from '../components/ModalRemitente';
import ModalResponsable from '../components/ModalResponsable';

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalOficio({ isOpen, onClose, onSave }: ModalOficioProps) {
  const [remitenteType, setRemitenteType] = useState("Interno");
  const [destinatarioType, setDestinatarioType] = useState("Interno");
  const [remitenteName, setRemitenteName] = useState<string | null>(null);
  const [destinatarioName, setDestinatarioName] = useState<string | null>(null);
  const [responsableName, setResponsableName] = useState<string | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleRemitenteSave = (name: string) => {
    setRemitenteName(name);
    setShowRemitenteModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <h2 className="text-lg font-semibold mb-4">Ingresar Oficio Recibido</h2>

        <div className="flex flex-col space-y-4">
          {/* Folio y Selección */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-24 sm:space-y-0 sm:space-x-24">
            <div className="flex items-center">
              <span className="w-24 sm:w-12">Folio:</span>
              <input
                type="text"
                placeholder="Folio"
                className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-sm"
              />
            </div>

            <div className="flex items-center space-x-3">
              <label className="mr-1">CEA</label>
              <input type="radio" name="selection" className="mr-4" />

              <label className="mr-1">SEPRA</label>
              <input type="radio" name="selection" />
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

          {/* Número de Oficio y Fechas */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block mb-2">Número de Oficio</label>
              <input
                type="text"
                placeholder="Número de Oficio"
                className="border border-gray-300 rounded p-2 w-full text-sm"
              />
            </div>
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block mb-2">Fecha Captura</label>
              <input
                type="date"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Fecha Límite</label>
              <input
                type="date"
                className="border border-gray-300 rounded p-2 w-full"
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
                  <input
                    type="radio"
                    id="remitenteInterno"
                    name="remitenteType"
                    value="Interno"
                    checked={remitenteType === "Interno"}
                    onChange={() => setRemitenteType("Interno")}
                    className="mr-2"
                  />
                  <label htmlFor="remitenteInterno" className="cursor-pointer mr-4">Interno</label>

                  <input
                    type="radio"
                    id="remitenteExterno"
                    name="remitenteType"
                    value="Externo"
                    checked={remitenteType === "Externo"}
                    onChange={() => setRemitenteType("Externo")}
                    className="mr-2"
                  />
                  <label htmlFor="remitenteExterno" className="cursor-pointer">Externo</label>
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona que firma el oficio"
                  value={remitenteName || ''}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                  onClick={() => setShowRemitenteModal(true)}
                />
                <FaSearch
                  onClick={() => setShowRemitenteModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {/* Nombre del Destinatario */}
              <label className="block mb-2 flex items-center">
                Nombre del destinatario
                <div className="ml-4 flex items-center">
                  <input
                    type="radio"
                    id="destinatarioInterno"
                    name="destinatarioType"
                    value="Interno"
                    checked={destinatarioType === "Interno"}
                    onChange={() => setDestinatarioType("Interno")}
                    className="mr-2"
                  />
                  <label htmlFor="destinatarioInterno" className="cursor-pointer mr-4">Interno</label>

                  <input
                    type="radio"
                    id="destinatarioExterno"
                    name="destinatarioType"
                    value="Externo"
                    checked={destinatarioType === "Externo"}
                    onChange={() => setDestinatarioType("Externo")}
                    className="mr-2"
                  />
                  <label htmlFor="destinatarioExterno" className="cursor-pointer">Externo</label>
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona a quien va dirigido"
                  value={destinatarioName || ''}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                  onClick={() => setShowDestinatarioModal(true)}
                />
                <FaUserPlus
                  onClick={() => setShowDestinatarioModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Nombre del Responsable */}
            <div className="flex flex-col sm:col-span-2 sm:flex-row justify-end">
              <div className="flex flex-col sm:w-1/2">
                <label className="block mb-2">Nombre del Responsable</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Persona que atenderá el oficio"
                    value={responsableName || ''}
                    className="border border-gray-300 rounded p-2 w-full text-sm"
                    readOnly
                    onClick={() => setShowResponsableModal(true)}
                  />
                  <FaSearch
                    onClick={() => setShowResponsableModal(true)}
                    className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tema */}
          <div className="flex mb-4">
            <input type="text" placeholder="Tema" className="border border-gray-300 rounded p-2 flex-1 text-sm" />
          </div>

          {/* Observaciones */}
          <div className="mb-4">
            <label className="block mb-2">Observaciones</label>
            <textarea
              rows={textareaRows}
              onChange={(e) => setTextareaRows(Math.max(3, e.target.value.split('\n').length))}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* Adjuntar Archivo */}
          <div className="flex items-center mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2"
              accept=".pdf"  // Acepta solo archivos PDF
            />
            {selectedFile && (
              <div className="ml-4 text-sm">{selectedFile.name}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="bg-[#641c34] text-white py-2 px-4 rounded">Cancelar</button>
          <button onClick={onSave} className="bg-[#993233] text-white py-2 px-4 rounded">Guardar</button>
        </div>

        {showDestinatarioModal && (
          <ModalDestinatario
            isOpen={showDestinatarioModal}
            onClose={() => setShowDestinatarioModal(false)}
            onSave={handleDestinatarioSave}
          />
        )}

        {showRemitenteModal && (
          <ModalRemitente
            isOpen={showRemitenteModal}
            onClose={() => setShowRemitenteModal(false)}
            onSave={handleRemitenteSave}
          />
        )}

        {showResponsableModal && (
          <ModalResponsable
            isOpen={showResponsableModal}
            onClose={() => setShowResponsableModal(false)}
            onSave={handleResponsableSave}
          />
        )}
      </div>
    </div>
  );
}