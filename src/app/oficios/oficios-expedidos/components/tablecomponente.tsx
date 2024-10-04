import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TableComponenteProps<T> {
  data: T[];
  columns: string[];
  accessor: (item: T, column: string) => string | number;
  onRowClick: (value: string, depto: string) => void; // Modificado aquí
  columnKeyForRowClick: string;
  searchTerm: string; // Recibe el término de búsqueda
}

function TableComponente<T>({
  data,
  columns,
  accessor,
  onRowClick,
  columnKeyForRowClick,
  searchTerm
}: TableComponenteProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Valor inicial
  const [selectedRowValue, setSelectedRowValue] = useState<string | null>(null); // Valor único de la fila seleccionada

  // Filtrado de datos
  const filteredData = data.filter(item =>
    columns.some(column =>
      (accessor(item, column) as string).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación de datos
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handleRowClick = (rowIndex: number) => {
    const value = accessor(paginatedData[rowIndex], columnKeyForRowClick) as string;
    const depto = accessor(paginatedData[rowIndex], 'Departamento') as string; // Obtener el departamento
    onRowClick(value, depto); // Pasar el nombre y el departamento
    setSelectedRowValue(value); 
  };

  return (
    <div>
      {/* Tabla */}
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((item, rowIndex) => {
            const rowValue = accessor(item, columnKeyForRowClick) as string;
            return (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(rowIndex)}
                className={`cursor-pointer ${
                  rowValue === selectedRowValue ? 'bg-blue-200' : (rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white')
                } hover:bg-gray-200`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm font-medium text-gray-900"
                  >
                    {accessor(item, column)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Controles de Paginación y Número de Filas por Página */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Filas por pág:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setCurrentPage(prevPage => Math.max(0, prevPage - 1))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 0}
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm text-gray-600">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(prevPage => Math.min(totalPages - 1, prevPage + 1))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={currentPage >= totalPages - 1}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableComponente;
