"use client";

import { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useModal } from "../Hooks/useModal";
import TableComponentModales from "./TablecomponentModales";

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
}

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  datosEmpleados: Empleados[];
}

const ModalDestinatario = (props: ModalDestinatarioProps) => {
  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
  } = useModal({
    data: props.datosEmpleados,
    columnsToFilter: [
      "nombreCompleto",
      "descripcionDepto",
      "descripcionPuesto",
    ],
    onClose: props.onClose,
    onSave: (selectedDestinatario: string) => {
      props.onSave(selectedDestinatario);
    },
  });

  const columns = [
    {
      header: "Nombre Completo",
      accessor: (row: Empleados) => row.nombreCompleto,
    },
    {
      header: "Departamento",
      accessor: (row: Empleados) => row.descripcionDepto,
    },
    {
      header: "Puesto",
      accessor: (row: Empleados) => row.descripcionPuesto,
    },
  ];

  const [selectedDestinatario, setSelectedDestinatario] = useState<
    string | null
  >(null);

  if (!props.isOpen) return null;

  const handleRowClick = (nombreCompleto: string) =>
    setSelectedDestinatario(nombreCompleto);

  const handleSave = () => {
    if (selectedDestinatario) {
      props.onSave(selectedDestinatario);
      props.onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${
        props.isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">
            Seleccionar Destinatario
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

        <TableComponentModales<Empleados>
          data={paginatedData}
          columns={columns}
          //onRowClick={handleRowClick}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        ></TableComponentModales>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={props.onClose}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDestinatario;
