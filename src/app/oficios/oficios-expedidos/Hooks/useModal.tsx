import { useState, useMemo } from "react";

interface UseModalParams<T> {
  data: T[];
  columnsToFilter: (keyof T)[];
}

export function useModal<T extends Record<string, any>>({
  data,
  columnsToFilter
}: UseModalParams<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      columnsToFilter.some(column =>
        String(item[column]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, columnsToFilter]);

  const paginatedData = useMemo(() => {
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [currentPage, rowsPerPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleRowClick = (item: T) => {
    setSelectedItem(item);
  };

  const handleSave = (onSave: (item: T) => void, onClose: () => void) => {
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
    handleSave
  };
}
