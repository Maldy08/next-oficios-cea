import { useState, useEffect } from "react";

interface UseModalOficio1Props<T> {
  data: T[];
  columnsToFilter: string[]; // Cambiado a string[] para definirlo como un array de strings
  onClose: () => void;
  onSave: (item: T) => void;
}

export default function useModalOficioR1<T>({
  data,
  columnsToFilter,
  onClose,
  onSave,
}: UseModalOficio1Props<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // Filtrado de datos
  const filteredData = (data || []).filter((item) =>
    columnsToFilter.some((column) =>
      String(item[column as keyof T])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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

  const handleSave = () => {
    if (selectedItem) {
      onSave(selectedItem);
      onClose();
    }
  };

  return {
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
