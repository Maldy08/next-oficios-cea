"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalEdit from "../components/components table/ModalEdit";
import TableComponent from "../components/table";
import ModalOficioExpedido from "../components/ModalOficioExpedido";
import ModalList from "../components/components table/ModalList";
import UseClienteComponent from "../Hooks/UseClientComponent";
interface ClientComponentProps {
  rows: any[];
  departamentos: any[];
  datosEmpleados: any[];
  remitentes: any[];
}

export default function ClientComponent({
  rows,
  departamentos,
  datosEmpleados,
  remitentes,
}: ClientComponentProps) {
  const {
    modalType,
    setModalType,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleChangeRowsPerPage,
    handleChangePage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  } = UseClienteComponent({
    rows,
  });

  return (
    <>
      {/* Barra de búsqueda y botón de nuevo oficio */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleOpenModal("oficioExpedido")}
          className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          INGRESAR OFICIO EXPEDIDO
        </button>

        <div className="w-1/2 relative">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded pl-10"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Tabla con los datos filtrados y paginados */}
      <TableComponent
        rows={paginatedRows}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        datosEmpleados={datosEmpleados}
      />

      {/* Modales */}
      {modalType === "oficioExpedido" && (
        <ModalOficioExpedido
          isOpen={modalType === "oficioExpedido"}
          onClose={handleCloseModal}
          onSave={handleSave}
          departamentos={departamentos}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
        />
      )}

      {modalType === "edit" && (
        <ModalEdit
          isOpen={modalType === "edit"}
          onClose={handleCloseModal}
          onSave={handleSave}
          datosEmpleados={datosEmpleados}
          departamentos={departamentos}
          remitentes={remitentes}
        />
      )}

      {modalType === "list" && (
        <ModalList isOpen={modalType === "list"} onClose={handleCloseModal} />
      )}
    </>
  );
}
