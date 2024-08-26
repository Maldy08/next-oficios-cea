import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus, FaFileUpload } from 'react-icons/fa';
import ModalDestinatario from '../components/ModalDestinatario';
import ModalRemitente from '../components/ModalRemitente';
import ModalResponsable from '../components/ModalResponsable';

interface ModalOficioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalOficio({ isOpen, onClose, onSave }: ModalOficioProps) {
  const [isExterno, setIsExterno] = useState(false);
  const [isInterno, setIsInterno] = useState(false);
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);

  const [destinatario, setDestinatario] = useState<string | null>(null);
  const [responsable, setResponsable] = useState<string | null>(null);
  const [remitente, setRemitente] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const toggleExterno = () => {
    if (isInterno) {
      setIsInterno(false);
      setRemitente(null);
    }
    setIsExterno(true);
  };

  const toggleInterno = () => {
    if (isExterno) {
      setIsExterno(false);
      setDestinatario(null);
      setResponsable(null);
    }
    setIsInterno(true);
  };

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
    setDestinatario(name);
    setShowDestinatarioModal(false);
  };

  const handleResponsableSave = (name: string) => {
    setResponsable(name);
    setShowResponsableModal(false);
  };

  const handleRemitenteSave = (name: string) => {
    setRemitente(name);
    setShowRemitenteModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0">
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
            <div>
              {/* Checkbox Externo */}
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="externo"
                  checked={isExterno}
                  onChange={toggleExterno}
                  className="hidden peer"
                />
                <label
                  htmlFor="externo"
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <span className="sr-only">Externo</span>
                  <div className="relative">
                    <div
                      className={`block w-12 h-6 rounded-full transition-colors duration-300 
                ${isExterno ? "bg-green-500" : "bg-gray-200"}`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 
                ${isExterno ? "translate-x-6" : ""}`}
                    ></div>
                  </div>
                  <span className="ml-2 text-lg font-medium">Externo?</span>
                </label>
              </label>

              {/* Nombre del Remitente - Barra de búsqueda */}
              {isExterno && (
                <div className="mb-4">
                  <label className="block mb-2">Nombre del Remitente</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Persona que firma el oficio"
                      value={remitente || ''}
                      readOnly
                      className="border border-gray-300 rounded p-2 w-full text-sm"
                    />
                    <FaSearch
                      onClick={() => setShowRemitenteModal(true)}
                      className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Checkbox Interno */}
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="interno"
                  checked={isInterno}
                  onChange={toggleInterno}
                  className="hidden peer"
                />
                <label
                  htmlFor="interno"
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <span className="sr-only">Interno</span>
                  <div className="relative">
                    <div
                      className={`block w-12 h-6 rounded-full transition-colors duration-300 
                ${isInterno ? "bg-green-500" : "bg-gray-200"}`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 
                ${isInterno ? "translate-x-6" : ""}`}
                    ></div>
                  </div>
                  <span className="ml-2 text-lg font-medium">Interno?</span>
                </label>
              </label>

              {/* Nombre del Destinatario */}
              {isInterno && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2">Nombre del destinatario</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Persona a quien va dirigido"
                        value={destinatario || ''}
                        readOnly
                        className="border border-gray-300 rounded p-2 w-full text-sm"
                      />
                      <FaUserPlus
                        onClick={() => setShowDestinatarioModal(true)}
                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Nombre del Responsable */}
<div className="mb-4">
  <label className="block mb-2">Nombre del Responsable</label>
  <div className="relative">
    <input
      type="text"
      placeholder="Persona que envía el oficio"
      value={responsable || ''}
      readOnly
      className="border border-gray-300 rounded p-2 w-full text-sm"
    />
    <FaSearch  // Cambiado de FaUserPlus a FaSearch
      onClick={() => setShowResponsableModal(true)}
      className="absolute right-2 top-2 text-gray-400 cursor-pointer"
    />
  </div>
</div>

                </>
              )}
            </div>
          </div>

          {/* Tema */}
          <div className="flex mb-4">
            <input type="text" placeholder="Tema" className="border border-gray-300 rounded p-2 flex-1 text-sm" />
          </div>

          {/* Comentarios */}
          <div className="mb-4">
            <label className="block mb-2">Comentarios</label>
            <textarea
              rows={textareaRows}
              onChange={(e) => setTextareaRows(Math.min(5, e.target.value.split("\n").length))}
              className="border border-gray-300 rounded p-2 w-full text-sm"
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

          {/* Botones */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onSave}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </div>

        {/* Modales */}
        <ModalDestinatario
          isOpen={showDestinatarioModal}
          onClose={() => setShowDestinatarioModal(false)}
          onSave={handleDestinatarioSave}
        />
        <ModalResponsable
          isOpen={showResponsableModal}
          onClose={() => setShowResponsableModal(false)}
          onSave={handleResponsableSave}
        />
        <ModalRemitente
          isOpen={showRemitenteModal}
          onClose={() => setShowRemitenteModal(false)}
          onSave={handleRemitenteSave}
        />
      </div>
    </div>
  );
}
