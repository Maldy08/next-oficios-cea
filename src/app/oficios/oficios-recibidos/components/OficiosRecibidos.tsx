"use client";

import TableComponent from "../../oficios-expedidos/components/table";
import UseOficioR from "../HooksRecibido/UseOficioRecibidos";
import ModalOficio from "./ModalOficio";
import ModalResponsable from "./ModalResponsable";
import UseClienteComponent from "../../oficios-expedidos/Hooks/UseClientComponent";
import { FiSearch } from "react-icons/fi";
import ModalEdit from "../components/components table/ModalEdit";

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
      />

      {modalType === "oficioRecibido" && (
        <ModalOficio
          isOpen={modalType === "oficioRecibido"}
          onClose={handleCloseModal}
          onSave={handleSave}
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
            remitentes={remitentes}
          />
      )}
    </>
  );
}