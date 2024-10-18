"use client";

import TableComponent from "../../oficios-expedidos/components/table";
import UseOficioR from "../HooksRecibido/UseOficioRecibidos";
import ModalOficio from "./ModalOficio";
import ModalResponsable from "./ModalResponsable";
import UseClienteComponent from "../../oficios-expedidos/Hooks/UseClientComponent";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

interface OficiosPageProps {
  remitentes: any[];
  datosEmpleados: any[];
  rows: any[];
}

export default function OficiosPage({
  remitentes,
  datosEmpleados,
  rows,
}: OficiosPageProps) {
  const { modalType, handleOpenModal, handleCloseModal, handleSave } =
    UseOficioR();

  const {
    setModalType,
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    handleChangeRowsPerPage,
    handleChangePage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  } = UseClienteComponent({
    rows,
  });

  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada

  const handleEdit = (rowData: any) => {
    setSelectedRow(rowData); // Guarda los datos de la fila seleccionada
    handleOpenModal("oficioEdit"); // Abre el modal en modo edición
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleOpenModal("oficioRecibido")}
          className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          INGRESAR OFICIO RECIBIDOS
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

      <TableComponent
        rows={paginatedRows}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        datosEmpleados={datosEmpleados}
        editado={true}
        handleEdit={handleEdit}
      />

      {modalType === "oficioRecibido" && (
        <ModalOficio
          isOpen={modalType === "oficioRecibido"}
          onClose={handleCloseModal}
          onSave={handleSave}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
          esNuevo={true}
          editado={false}
          rowData={selectedRow}
        />
      )}
      {modalType === "oficioEdit" && (
        <ModalOficio
          isOpen={modalType === "oficioEdit"}
          onClose={handleCloseModal}
          onSave={handleSave}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
          esNuevo={false}
          editado={true}
          rowData={selectedRow}
        />
      )}
    </>
  );
}
