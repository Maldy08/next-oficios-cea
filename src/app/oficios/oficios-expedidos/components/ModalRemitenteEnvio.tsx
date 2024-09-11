"use client";

import { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useModal } from "../Hooks/useModal";

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
}

interface Props {
  remitentes: Remitente[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const ModalRemitenteEnvio = (props: Props) => {
  const {
    setSelectedRemitente,
    selectedRemitente,
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    handleSave,
    handleRowClick,
  } = useModal({
    data: props.remitentes,
    columnsToFilter: ["nombre", "empresa", "cargo"],
    onClose: function (): void {
      throw new Error("Function not implemented.");
    },
    onSave: function (selectedDestinatario: string): void {
      throw new Error("Function not implemented.");
    },
  });

  function onSave(item: Remitente): void {
    throw new Error("Function not implemented.");
  }

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

        <div className="flex-grow overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="font-bold border-b py-2 px-4">
                  Nombre Completo
                </th>
                <th className="font-bold border-b py-2 px-4">Empresa</th>
                <th className="font-bold border-b py-2 px-4">Cargo</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row: any, index: any) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(row.nombre)}
                  className={`cursor-pointer ${
                    selectedRemitente === row.nombre ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="border-b py-2 px-4">{row.nombre}</td>
                  <td className="border-b py-2 px-4">{row.empresa}</td>
                  <td className="border-b py-2 px-4">{row.cargo}</td>
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
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
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
            onClick={() => handleSave(onSave, props.onClose)}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRemitenteEnvio;
