"use client";

import { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useModal } from "../Hooks/useModal";

interface Empleado {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

interface ModalResponsableEnvioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Empleado) => void;
  datosEmpleados: Empleado[];
}

const ModalResponsableEnvio = (props: ModalResponsableEnvioProps) => {
  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    selectedItem,
    handleRowClick,
    handleSave
  } = useModal({
    data: props.datosEmpleados,
    columnsToFilter: ['nombreCompleto', 'descripcionDepto', 'descripcionPuesto']
  });

  if (!props.isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Responsable</h2>
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

        <div className="flex-grow overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="font-bold border-b py-2 px-4">Nombre Completo</th>
                <th className="font-bold border-b py-2 px-4">Departamento</th>
                <th className="font-bold border-b py-2 px-4">Puesto</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(row)}
                  className={`cursor-pointer ${selectedItem === row ? "bg-blue-100" : ""}`}
                >
                  <td className="border-b py-2 px-4">{row.nombreCompleto}</td>
                  <td className="border-b py-2 px-4">{row.descripcionDepto}</td>
                  <td className="border-b py-2 px-4">{row.descripcionPuesto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={currentPage === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={currentPage >= totalPages - 1}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Filas por pág:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

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
            onClick={() => handleSave(props.onSave, props.onClose)}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResponsableEnvio;
