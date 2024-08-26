import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import ModalDestinatarioEnvio from "./ModalDestinatarioEnvio";
import ModalRemitenteEnvio from "./ModalRemitenteEnvio";
import ModalResponsableEnvio from "./ModalResponsableEnvio";

interface ModalOficioExpedidoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalOficioExpedido({ isOpen, onClose, onSave }: ModalOficioExpedidoProps) {
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [destinatarioName, setDestinatarioName] = useState<string>("");
  const [remitenteName, setRemitenteName] = useState<string>("");
  const [responsableName, setResponsableName] = useState<string>("");

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0">
        <h2 className="text-lg font-semibold mb-4">Ingresar Oficio Expedidos</h2>

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

          {/* Área o Departamento y Fechas */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            {/* Área o Departamento */}
            <div className="flex-grow mb-4 sm:mb-0">
              <label className="block mb-2">Área o Departamento</label>
              <select className="border border-gray-300 rounded p-2 w-full text-sm">
                <option value="">Selecciona una opción</option>
                <option value="departamento1">Departamento 1</option>
                <option value="departamento2">Departamento 2</option>
                <option value="departamento3">Departamento 3</option>
              </select>
            </div>

            {/* Fecha Captura */}
            <div className="flex-none w-40 mb-4 sm:mb-0">
              <label className="block mb-2">Fecha Captura</label>
              <input
                type="date"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            {/* Fecha Límite */}
            <div className="flex-none w-40">
              <label className="block mb-2">Fecha Límite</label>
              <input
                type="date"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          </div>

          {/* Grid Layout para los campos de texto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              {/* Nombre del Remitente */}
              <label className="block mb-2">Nombre del Remitente</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona que firma el oficio"
                  value={remitenteName}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                />
                <FaSearch
                  onClick={() => setShowRemitenteModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {/* Nombre del Destinatario */}
              <label className="block mb-2">Nombre del destinatario</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona a quien va dirigido"
                  value={destinatarioName}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                />
                <FaUserPlus
                  onClick={() => setShowDestinatarioModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Alineación a la derecha para "Nombre del Responsable" */}
            <div className="flex flex-col sm:col-span-2 sm:flex-row justify-end">
              <div className="flex flex-col sm:w-1/2">
                {/* Nombre del Responsable */}
                <label className="block mb-2">Nombre del Responsable</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Persona que atenderá el oficio"
                    value={responsableName}
                    className="border border-gray-300 rounded p-2 w-full text-sm"
                    readOnly
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
          <div className="flex flex-col mb-4">
            <label className="block mb-2">Observaciones</label>
            <textarea
              rows={textareaRows}
              placeholder="Observaciones"
              className="border border-gray-300 rounded p-2 w-full"
              onChange={(e) => {
                const lines = e.target.value.split("\n").length;
                setTextareaRows(Math.min(lines, 10)); // Limitar a un máximo de 10 filas
              }}
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

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>

        {/* Modals */}
        {showDestinatarioModal && (
          <ModalDestinatarioEnvio
            isOpen={showDestinatarioModal}
            onClose={() => setShowDestinatarioModal(false)}
            onSave={handleSaveDestinatario}
          />
        )}
        {showRemitenteModal && (
          <ModalRemitenteEnvio
            isOpen={showRemitenteModal}
            onClose={() => setShowRemitenteModal(false)}
            onSave={handleSaveRemitente} 
          />
        )}
        {showResponsableModal && (
          <ModalResponsableEnvio
            isOpen={showResponsableModal}
            onClose={() => setShowResponsableModal(false)}
            onSave={handleSaveResponsable}
          />
        )}
      </div>
    </div>
  );
}
