import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Column<T> {
  header: string;
  accessor: (item: T) => string | number;
}

interface TableComponentModalesProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

function TableComponentModales<T>({
  data,
  columns,
  onRowClick,
  currentPage,
  rowsPerPage,
  totalPages,
  setCurrentPage,
  setRowsPerPage,
}: TableComponentModalesProps<T>) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number, item: T) => {
    setSelectedRow(index);
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowClick(rowIndex, item)}
              className={`cursor-pointer hover:bg-blue-100 ${
                selectedRow === rowIndex ? "bg-blue-200" : ""
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm text-gray-900 break-words whitespace-normal"
                >
                  {column.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 0}
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={currentPage >= totalPages - 1}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Filas por pág:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TableComponentModales;
