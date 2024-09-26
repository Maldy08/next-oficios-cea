import { useState, useEffect } from "react";

interface UseModalOficio1Props<T> {
  data: T[];
  columnsToFilter: (keyof T)[];
  onClose: () => void;
  onSave: (item: T) => void; // Cambiado de (name: string) => void a (item: T) => void
}

export default function useModalOficioR1<T extends Record<string, any>>({
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
      String(item[column]).toLowerCase().includes(searchTerm.toLowerCase())
    )
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
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    selectedItem,
    setSelectedItem,
    handleRowClick,
    handleSave,
  };
} 