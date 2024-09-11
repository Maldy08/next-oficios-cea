<<<<<<< HEAD
import { Console } from "console";
import { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DatosModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedDestinatario: string) => void;
  remitentes: remitentes[];
}
interface Empleados {
  mamadas: string;
}
interface remitentes {
  id: number;
  nombre: string;
  empresa: string;
  cargo: string;
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

const ModalA = (props: DatosModal) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedRemitente, setSelectedRemitente] = useState<string | null>(
    null
  );
  const [selectedDestinatario, setSelectedDestinatario] = useState<
    string | null
  >(null);

  const [data, setData] = useState<remitentes[]>(props.remitentes);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  const handleRowClick = (name: string) => {
    setSelectedRemitente(name);
  };

  const handleSave = () => {
    if (selectedRemitente) {
      props.onSave(selectedRemitente);
      props.onClose();
    }
  };

  // const filteredData = props.remitentes.filter(
  //   (row) =>
  //     row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
  //     row.empresa.toLowerCase().includes(searchText.toLowerCase()) ||
  //     row.cargo.toLowerCase().includes(searchText.toLowerCase())
  // );

  // const filterData = (datos: any[]): any => {
  //   datos.filter((row: any) => {
  //     if (datos === row.id) {
  //       row.nombre.toLowerCase().includes(searchText.toLowerCase());
  //       row.empresa.toLowerCase().includes(searchText.toLowerCase());
  //       row.cargo.toLowerCase().includes(searchText.toLowerCase());
  //     } else if (datos === row.idPue) {
  //       row.nombreCompleto.toLowerCase().includes(searchText.toLowerCase());
  //       row.descripcionDepto.toLowerCase().includes(searchText.toLowerCase());
  //       row.descripcionPuesto.toLowerCase().includes(searchText.toLowerCase());
  //     } else {
  //       console.log("No entro a ninguna condicion ");
  //       console.log(datos);
  //     }
  //   });
  //   console.log("Entro a la funcion");
  //   return datos;
  // };
  const filterData = (
    data: "T"[],
    searchText: string,
    datosRecibidos: "T"[]
  ) => {};

  const totalPages = Math.ceil(filterData.length / rowsPerPage);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchText,
    setSearchText,
    selectedRemitente,
    setSelectedRemitente,
    data,
    setData,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
    handleRowClick,
    handleSave,
    filterData,
    totalPages,
    selectedDestinatario,
  };
};

export default ModalA;
=======
import { useState, useEffect } from "react";

interface UseModalParams<T> {
  data: T[];
  columnsToFilter: (keyof T)[];
  onClose: () => void;
  onSave: (name: string) => void;
}

export function useModal<T extends Record<string, any>>({
  data,
  columnsToFilter,
  onClose,
  onSave,
}: UseModalParams<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // Filtrado de datos
  const filteredData = (data || []).filter((item) =>
    columnsToFilter.some((column) =>
      String(item[column]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleRowClick = (item: T) => {
    setSelectedItem(item);
  };

  const handleSave = (onSave: (item: T) => void, onClose: () => void) => {
    if (selectedItem) {
      onSave(selectedItem);
      onClose();
    }
  };

  const [selectedRemitente, setSelectedRemitente] = useState<string | null>(
    null
  );

  return {
    setSelectedRemitente,
    selectedRemitente,
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    selectedItem,
    setSelectedItem,
    handleRowClick,
    handleSave,
  };
}
>>>>>>> roberto
