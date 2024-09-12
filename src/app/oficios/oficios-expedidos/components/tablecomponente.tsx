import React, { useState } from 'react';

interface TableComponenteProps<T> {
  data: T[];
  columns: string[];
  accessor: (item: T, column: string) => string | number;
  onRowClick: (value: string) => void; // Cambiar el tipo si es necesario
  columnKeyForRowClick: string; // Nueva propiedad para la clave de columna
}

function TableComponente<T>({
  data,
  columns,
  accessor,
  onRowClick,
  columnKeyForRowClick
}: TableComponenteProps<T>) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number) => {
    const value = accessor(data[rowIndex], columnKeyForRowClick) as string; // Usar la clave de columna proporcionada
    setSelectedRow(rowIndex);
    onRowClick(value);
  };

  return (
    <div>
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
      {data.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          onClick={() => handleRowClick(rowIndex)}
          className={`cursor-pointer ${selectedRow === rowIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
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
      ))}
    </tbody>
  </table>
</div>

  );
}

export default TableComponente;
