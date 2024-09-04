import { FaSearch, FaUserPlus } from "react-icons/fa";
import {
  ModalDestinatarioEnvio,
  ModalRemitenteEnvio,
  ModalResponsableEnvio,
  ModalPersonaEnvio,
  UseModalOficioExpedido,
} from "../"; // Ajusta la ruta según sea necesario

interface Departamento {
  idCea: number;
  descripcion: string;
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

interface ModalOficioExpedidoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  departamentos: Departamento[];
  datosEmpleados: Empleados[];
  remitentes: remitentes[];
}

export default function ModalOficioExpedido({
  isOpen,
  onClose,
  onSave,
  departamentos,
  datosEmpleados,
  remitentes,
}: ModalOficioExpedidoProps) {
  const {
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
  } = UseModalOficioExpedido({ departamentos });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-lg font-semibold mb-4">
          Ingresar Oficio Expedidos
        </h2>

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
                id="numeroOficio"
                type="text"
                placeholder="Número de oficio"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            {/* Persona que lo entrega */}
            <div className="flex-grow">
              <label htmlFor="personaEntrega" className="block mb-2">
                Persona que lo entrega
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre del destinatario"
                  value={personaEntregaName}
                  className="border border-gray-300 rounded p-2 w-full text-sm"
                  readOnly
                  onClick={() => setShowPersonaEnvioModal(true)}
                />
                <FaUserPlus
                  onClick={() => setShowPersonaEnvioModal(true)}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Nombre del Remitente */}
            <div className="flex flex-col">
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

            {/* Nombre del Destinatario */}

            <div className="flex flex-col">
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
                  value={destinatarioName}
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

          {/* Aqui empieza Tema */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Tema"
              className="border border-gray-300 rounded p-2 flex-1 text-sm"
            />
          </div>

          {/* Aqui empieza Observaciones */}
          <div className="mb-4">
            <label htmlFor="observaciones" className="block mb-2">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              rows={textareaRows}
              onChange={(e) =>
                setTextareaRows(e.target.value.split("\n").length)
              }
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* Aqui empieza Adjuntar Archivo */}
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

          {/* Aqui empieza Botones */}
          <div className="flex justify-end space-x-4">
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
        </div>

        {/* Modales */}
        <ModalDestinatarioEnvio
          isOpen={showDestinatarioModal}
          onClose={() => setShowDestinatarioModal(false)}
          onSave={handleSaveDestinatario}
          datosEmpleados={datosEmpleados}
        />
        <ModalRemitenteEnvio
          isOpen={showRemitenteModal}
          onClose={() => setShowRemitenteModal(false)}
          onSave={handleSaveRemitente}
          remitentes={remitentes} // Esto debería funcionar si los tipos coinciden
        />

        <ModalResponsableEnvio
          isOpen={showResponsableModal}
          onClose={() => setShowResponsableModal(false)}
          onSave={handleSaveResponsable}
          datosEmpleados={datosEmpleados}
        />
        <ModalPersonaEnvio
          isOpen={showPersonaEnvioModal}
          onClose={() => setShowPersonaEnvioModal(false)}
          onSave={handleSavePersonaEnvio}
          datosEmpleados={datosEmpleados}
        />
      </div>
    </div>
  );
}