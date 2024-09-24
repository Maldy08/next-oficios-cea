"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useModal } from "../Hooks/useModal";
import TableComponentModales from "./TablecomponentModales";

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
}

interface Props {
  remitentes: Remitente[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (remitente: Remitente) => void; // Cambiamos a tipo 'Remitente'
}

const ModalRemitenteEnvio = (props: Props) => {
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
    selectedItem, // Aquí obtenemos el item seleccionado, que es de tipo Remitente
  } = useModal({
    data: props.remitentes,
    columnsToFilter: ["nombre", "empresa", "cargo"],
    onClose: props.onClose,
    onSave: props.onSave, // Dejamos que onSave venga desde los props
  });

  // Definir columnas de la tabla
  const columns = [
    {
      header: "Nombre Completo",
      accessor: (row: Remitente) => row.nombre,
    },
    {
      header: "Departamento",
      accessor: (row: Remitente) => row.empresa,
    },
    {
      header: "Puesto",
      accessor: (row: Remitente) => row.cargo,
    },
  ];

  // Función para guardar el remitente seleccionado y cerrar el modal
  function onSave() {
    if (selectedItem) {
      props.onSave(selectedItem); // Guardamos el remitente seleccionado
      props.onClose(); // Cerramos el modal
    }
  }

  if (!props.isOpen) return null;

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

        <TableComponentModales<Remitente>
          data={paginatedData}
          columns={columns}
          onRowClick={handleRowClick}
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
            onClick={onSave} // Guardar el remitente seleccionado
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
