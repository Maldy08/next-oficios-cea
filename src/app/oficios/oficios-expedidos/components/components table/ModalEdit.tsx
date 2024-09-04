import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import ModalDestinatarioEnvio from "../ModalDestinatarioEnvio";
import ModalRemitenteEnvio from "../ModalRemitenteEnvio";
import ModalResponsableEnvio from "../ModalResponsableEnvio";
import ModalPersonaEnvio from "./ModalPersonaEnvio";

interface ModalOficioExpedidoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  departamentos: Departamento[];
  datosEmpleados: Empleados[];
}

interface Departamento {
  //Identifica las opciones de la lista desplegable de area o departemetno
  idCea: number;
  descripcion: string;
}

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

export default function ModalOficioExpedido({
  isOpen,
  onClose,
  onSave,
  departamentos,
  datosEmpleados,
}: ModalOficioExpedidoProps) {
  const [textareaRows, setTextareaRows] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDestinatarioModal, setShowDestinatarioModal] = useState(false);
  const [showRemitenteModal, setShowRemitenteModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [showPersonaEnvioModal, setShowPersonaEnvioModal] = useState(false);
  const [destinatarioName, setDestinatarioName] = useState<string | null>(null);
  const [remitenteName, setRemitenteName] = useState<string>("");
  const [responsableName, setResponsableName] = useState<string>("");
  const [personaEntregaName, setPersonaEntregaName] = useState<string>("");
  const [destinatarioType, setDestinatarioType] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");

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

  const handleSavePersonaEnvio = (name: string) => {
    setPersonaEntregaName(name);
    setShowPersonaEnvioModal(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-lg font-semibold mb-4">Editar Oficio Expedidos</h2>

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
              <label className="flex items-center mr-4 cursor-pointer">
                <input type="radio" name="selection" className="mr-1" />
                CEA
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="selection" className="mr-1" />
                SEPRA
              </label>
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
              <label htmlFor="areaSelect" className="block mb-2">
                Área o Departamento
              </label>
              <select
                id="areaSelect"
                value={selectedArea}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded p-2 w-full text-sm"
              >
                <option value="">Selecciona una opción</option>
                {departamentos.length > 0 ? (
                  departamentos.map((departamento) => (
                    <option key={departamento.idCea} value={departamento.idCea}>
                      {departamento.descripcion}
                    </option>
                  ))
                ) : (
                  <option value="">No hay departamentos disponibles</option>
                )}
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

          {/* Número de Oficio y Persona que lo entrega */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            {/* Número de Oficio */}
            <div className="flex-none w-40 mb-4 sm:mb-0">
              <label htmlFor="numeroOficio" className="block mb-2">
                Número de Oficio
              </label>
              <input
                type="text"
                id="numeroOficio"
                placeholder="Número de Oficio"
                className="border border-gray-300 rounded p-2 w-full text-sm"
              />
            </div>

            {/* Persona que lo entrega a la mesa de correspondencia */}
            <div className="flex-grow mb-4 sm:mb-0">
              {/* Mantener la estructura del label similar a "Nombre del Remitente" */}
              <label className="block mb-2 flex items-center">
                Persona que lo entrega a la mesa de correspondencia
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona"
                  value={personaEntregaName}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                  onClick={() => setShowPersonaEnvioModal(true)}
                />
                <FaSearch
                  onClick={() => setShowPersonaEnvioModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Grid Layout para los campos de texto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              {/* Nombre del Remitente */}
              <label className="block mb-2 flex items-center">
                Nombre del Remitente
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona que firma el oficio"
                  value={remitenteName}
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
                  <label
                    htmlFor="destinatarioInterno"
                    className="cursor-pointer mr-4"
                  >
                    Interno
                  </label>

                  <input
                    type="radio"
                    id="destinatarioExterno"
                    name="destinatarioType"
                    value="Externo"
                    checked={destinatarioType === "Externo"}
                    onChange={() => setDestinatarioType("Externo")}
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Persona a quien va dirigido"
                  value={destinatarioName || ""}
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
                    value={responsableName}
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
            <input
              type="text"
              placeholder="Tema"
              className="border border-gray-300 rounded p-2 flex-1 text-sm"
            />
          </div>

          {/* Observaciones */}
          <div className="mb-4">
            <label htmlFor="observaciones" className="block mb-2">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              rows={textareaRows}
              onChange={(e) => {
                const lines = e.target.value.split("\n").length;
                setTextareaRows(Math.max(3, lines));
              }}
              className="border border-gray-300 rounded p-2 w-full text-sm"
            />
          </div>

          {/* Adjuntar Archivo */}
          <div className="flex items-center mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2"
              accept=".pdf" // Acepta solo archivos PDF
            />
            {selectedFile && (
              <div className="ml-4 text-sm">{selectedFile.name}</div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>

        {/* Modales */}
        {showDestinatarioModal && (
          <ModalDestinatarioEnvio
            isOpen={showDestinatarioModal}
            onClose={() => setShowDestinatarioModal(false)}
            onSave={handleSaveDestinatario}
            datosEmpleados={datosEmpleados}
          />
        )}

        {showRemitenteModal && (
          <ModalRemitenteEnvio
            isOpen={showRemitenteModal}
            onClose={() => setShowRemitenteModal(false)}
            onSave={handleSaveRemitente} remitentes={[]}          />
        )}

        {showResponsableModal && (
          <ModalResponsableEnvio
            isOpen={showResponsableModal}
            onClose={() => setShowResponsableModal(false)}
            onSave={handleSaveResponsable}
            datosEmpleados={datosEmpleados}
          />
        )}

        {showPersonaEnvioModal && (
          <ModalPersonaEnvio
            isOpen={showPersonaEnvioModal}
            onClose={() => setShowPersonaEnvioModal(false)}
            onSave={handleSavePersonaEnvio}
            datosEmpleados={datosEmpleados}
          />
        )}
      </div>
    </div>
  );
}