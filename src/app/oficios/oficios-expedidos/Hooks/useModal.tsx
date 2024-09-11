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
