"use client";

import TableComponent from "../../oficios-expedidos/components/table";
import UseOficioR from "../HooksRecibido/UseOficioRecibidos";
import ModalOficio from "./ModalOficio";
import ModalResponsable from "./ModalResponsable";
import UseClienteComponent from "../../oficios-expedidos/Hooks/UseClientComponent";

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
    <div className="flex justify-between ">
      <button
        onClick={() => handleOpenModal("oficioRecibido")}
        className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
      >
        INGRESAR OFICIO RECIBIDOS
      </button>

      {modalType === "oficioRecibido" && (
        <ModalOficio
          isOpen={modalType === "oficioRecibido"}
          onClose={handleCloseModal}
          onSave={handleSave}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
        />
      )}

      <TableComponent
        rows={paginatedRows}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        datosEmpleados={datosEmpleados}
      />
    </div>
  );
}
