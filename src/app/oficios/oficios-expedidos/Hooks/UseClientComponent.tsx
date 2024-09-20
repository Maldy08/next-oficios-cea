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

export default function UseClienteComponent({
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
  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setModalType(null);
  };

  // Guardar cambios y cerrar modal
  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

  // Controlar búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Cambiar número de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Cambiar de página
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Filtrar filas basado en el término de búsqueda
  const filteredRows = rows.filter(
    (row) =>
      (row.folio?.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof row.remDepen === 'string' ? row.remDepen.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (typeof row.tipo === 'string' ? row.tipo.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (typeof row.noOficio === 'string' ? row.noOficio.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (typeof row.remNombre === 'string' ? row.remNombre.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (typeof row.destNombre === 'string' ? row.destNombre.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
    (typeof row.estatus === 'string' ? row.estatus.toLowerCase() : '').includes(searchTerm.toLowerCase())
    
  );

  // Paginación de las filas filtradas
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
    handleChangeRowsPerPage,
    handleChangePage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  };
}
