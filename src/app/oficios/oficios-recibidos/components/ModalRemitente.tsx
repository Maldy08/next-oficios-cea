import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import useModalOficioR1 from "../HooksRecibido/UseTablasModal";
import TableComponentModales from "../../oficios-expedidos/components/TablecomponentModales";

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
}

interface Empleado {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  deptoComi: number;
}

interface ModalRemitenteProps {
  remitentes: Remitente[];
  empleados: Empleado[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (remitente: Remitente | Empleado) => void;
  tipoRemitente: string; // "1" para interno, "2" para externo
  tipo: string; // "1" para CEA, "2" para SEPROA
}

export default function ModalRemitente({
  remitentes,
  empleados,
  isOpen,
  onClose,
  onSave,
  tipoRemitente,
  tipo,
}: ModalRemitenteProps) {
  const data = tipoRemitente === "1" ? empleados : remitentes;

  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    handleRowClick,
    selectedItem,
  } = useModalOficioR1({
    data,
    columnsToFilter:
      tipoRemitente === "1"
        ? ["nombreCompleto", "descripcionDepto", "descripcionPuesto"]
        : ["nombre", "empresa", "siglas", "cargo"],
    onClose,
    onSave,
  });

  const columns = [
    {
      header: "Nombre Completo",
      accessor: (row: Remitente | Empleado) =>
        "nombreCompleto" in row ? row.nombreCompleto : row.nombre,
    },
    {
      header: "Departamento",
      accessor: (row: Remitente | Empleado) => {
        if (tipoRemitente === "1") {
          // Interno
          if (tipo === "1") {
            return "COMISION ESTATAL DEL AGUA";
          } else if (tipo === "2") {
            return "SECRETARÍA PARA EL MANEJO, SANEAMIENTO Y PROTECCIÓN DEL AGUA DE BAJA CALIFORNIA";
          }
        }
        // Externo
        return "empresa" in row ? row.empresa : row.descripcionDepto;
      },
    },
    {
      header: "Siglas",
      accessor: (row: Remitente | Empleado) => {
        if (tipoRemitente === "1") {
          // Interno
          return tipo === "1" ? "CEA" : "SEPROA";
        }
        // Externo
        return "siglas" in row ? row.siglas : "";
      },
    },
    {
      header: "Puesto",
      accessor: (row: Remitente | Empleado) =>
        "descripcionPuesto" in row ? row.descripcionPuesto : row.cargo,
    },
  ];

  if (!isOpen) return null;

  function handleSave() {
    if (selectedItem) {
      onSave(selectedItem);
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">
            Seleccionar Remitente
          </h2>
          <div className="relative w-full max-w-[300px]">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 text-sm rounded-none focus:border-blue-500 focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <TableComponentModales<Remitente | Empleado>
          data={paginatedData}
          columns={columns}
          onRowClick={handleRowClick}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#641c34] text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#993233] text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
