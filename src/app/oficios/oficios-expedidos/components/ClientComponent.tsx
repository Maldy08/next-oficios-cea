<<<<<<< HEAD
"use client";

import { ChangeEvent, useState } from "react";
=======
import { useState } from 'react';
>>>>>>> roberto
import { FiSearch } from "react-icons/fi";
import TableComponent from "./table";
import ModalOficioExpedido from "./ModalOficioExpedido";
import ModalEdit from "./components table/ModalEdit";
import ModalList from "./components table/ModalList";
<<<<<<< HEAD
import UseClienteComponets from "../Hooks/UseClientComponent";
=======
import { Departamentos, Empleados, Oficios, OficioUsuExterno } from '@/app/domain/entities';
>>>>>>> roberto

interface ClientComponentProps {
  rows: Oficios[];
  departamentos: Departamentos[];
  datosEmpleados: Empleados[];
  remitentes: OficioUsuExterno[];
}

<<<<<<< HEAD
export default function ClientComponent({
  rows,
  departamentos,
  datosEmpleados,
  remitentes, // Recibe los datos de remitentes aquí
}: ClientComponentProps) {
  const {
    modalType,
    setModalType,
=======
const UseClientComponent = ({ rows, departamentos, datosEmpleados, remitentes }: ClientComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [modalType, setModalType] = useState<string | null>(null);

  const paginatedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleOpenModal = (type: string) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleSave = () => {
    // Lógica para guardar los cambios
  };

  return {
>>>>>>> roberto
    searchTerm,
    setSearchTerm,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
<<<<<<< HEAD
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleChangePage,
    handleChangeRowsPerPage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  } = UseClienteComponets({
    rows: rows,
    departamentos: departamentos,
    datosEmpleados: datosEmpleados,
    remitentes: remitentes,
  });
=======
    modalType,
    setModalType,
    paginatedRows,
    handleOpenModal,
    handleCloseModal,
    handleSearchChange,
    handleChangeRowsPerPage,
    handleChangePage,
    handleSave,
  };
};

const ClientComponent = ({
  rows,
  departamentos,
  datosEmpleados,
  remitentes,
}: ClientComponentProps) => {
  const {
    searchTerm,
    handleSearchChange,
    rowsPerPage,
    handleChangeRowsPerPage,
    page,
    handleChangePage,
    modalType,
    handleOpenModal,
    handleCloseModal,
    paginatedRows,
    handleSave,
  } = UseClientComponent({ rows, departamentos, datosEmpleados, remitentes });
>>>>>>> roberto

  return (
    <>
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

      <TableComponent
        rows={paginatedRows}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        datosEmpleados={datosEmpleados}
      />

      {/* Paginación */}
      <div className="flex justify-end items-center mt-4">
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="mr-4 p-2 border border-gray-300 rounded-md"
        >
          <option value={5}>5 filas</option>
          <option value={10}>10 filas</option>
          <option value={25}>25 filas</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="p-2 border border-gray-300 rounded-md"
          >
            Anterior
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= rows.length}
            className="p-2 border border-gray-300 rounded-md"
          >
            Siguiente
          </button>
        </div>
      </div>

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
        />
      )}

      {modalType === "list" && (
        <ModalList isOpen={modalType === "list"} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ClientComponent;
