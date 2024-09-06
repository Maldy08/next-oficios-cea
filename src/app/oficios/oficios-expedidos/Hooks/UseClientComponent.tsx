import { useState } from "react";

interface ClientComponentProps {
  rows: any[];
  departamentos: any[]; // Cambiado a array
  datosEmpleados: any[];
  remitentes: any[]; // Añadido remitentes aquí
}

const UseClienteComponets = (props: ClientComponentProps) => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Estado para las filas por página
  const [page, setPage] = useState<number>(0);

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
    handleChangePage,
    handleChangeRowsPerPage,
    filteredRows,
    paginatedRows,
    handleSearchChange,
  };
};

export default UseClienteComponets;
