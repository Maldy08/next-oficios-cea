<<<<<<< HEAD
import { useState } from "react";

interface ClientComponentProps {
  rows: any[];
  departamentos: string[]; // Cambiado a array
  datosEmpleados: any[];
  remitentes: any[]; // Añadido remitentes aquí
}

const UseClienteComponets = (props: ClientComponentProps) => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Estado para las filas por página
  const [page, setPage] = useState<number>(0);

=======
"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalEdit from "../components/components table/ModalEdit";
import TableComponent from "../components/table";
import ModalOficioExpedido from "../components/ModalOficioExpedido";
import ModalList from "../components/components table/ModalList";

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
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  // Abrir modal con tipo
>>>>>>> roberto
  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

<<<<<<< HEAD
=======
  // Cerrar modal
>>>>>>> roberto
  const handleCloseModal = () => {
    setModalType(null);
  };

<<<<<<< HEAD
=======
  // Guardar cambios y cerrar modal
>>>>>>> roberto
  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

<<<<<<< HEAD
=======
  // Controlar búsqueda
>>>>>>> roberto
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

<<<<<<< HEAD
=======
  // Cambiar número de filas por página
>>>>>>> roberto
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
<<<<<<< HEAD
    setPage(0); // Reiniciar la página al cambiar el número de filas
  };

=======
    setPage(0);
  };

  // Cambiar de página
>>>>>>> roberto
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

<<<<<<< HEAD
  const filteredRows = props.rows.filter(
    (row) =>
      row.folio?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.remDepen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof row.tipo === "string" ? row.tipo.toLowerCase() : "").includes(
        searchTerm.toLowerCase()
      ) ||
      row.noOficio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.remNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.destNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof row.estatus === "string"
        ? row.estatus.toLowerCase()
        : ""
      ).includes(searchTerm.toLowerCase())
  );

=======
  // Filtrar filas basado en el término de búsqueda
  const filteredRows = rows.filter(
    (row) =>
      row.folio?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.remDepen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.noOficio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.remNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.destNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.estatus?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación de las filas filtradas
>>>>>>> roberto
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

<<<<<<< HEAD
  return {
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
    handleChangePage,
    handleChangeRowsPerPage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  };
};

export default UseClienteComponets;
=======
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
            disabled={(page + 1) * rowsPerPage >= filteredRows.length}
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
}
>>>>>>> roberto
