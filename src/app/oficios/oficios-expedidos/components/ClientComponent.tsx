"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalEdit from "./components table/ModalEdit";
import TableComponent from "./table";
import ModalOficioExpedido from "./ModalOficioExpedido";
import ModalList from "./components table/ModalList";


interface ClientComponentProps {
  rows: any[];
  departamentos: any; // Añadido departamentos aquí
  datosEmpleados: any[];
  remitentes: any[]; // Añadir remitentes aquí
}


export default function ClientComponent({
  rows,
  departamentos,
  datosEmpleados,
  remitentes, // Recibe los datos de remitentes aquí
}: ClientComponentProps) {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Estado para las filas por página
  const [page, setPage] = useState<number>(0); // Estado para la página actual

  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar la página al cambiar el número de filas
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  
  const filteredRows = rows.filter(
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

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            disabled={(page + 1) * rowsPerPage >= filteredRows.length}
            className="p-2 border border-gray-300 rounded-md"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Aquí están los modales */}
      {modalType === "oficioExpedido" && (
        <ModalOficioExpedido
          isOpen={modalType === "oficioExpedido"}
          onClose={handleCloseModal}
          onSave={handleSave}
          departamentos={departamentos} // Pasa departamentos al modal
          datosEmpleados={datosEmpleados}
          remitentes={remitentes} // Pasa remitentes al modal
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