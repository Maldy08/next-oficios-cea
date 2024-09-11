import React from 'react';

interface TableComponenteProps<T> {
  data: T[];
  columns: string[]; // Ahora solo es un arreglo de strings
  accessor: (item: T, column: string) => string | number; // Función para acceder a los datos
}

function TableComponente<T>({ data, columns, accessor }: TableComponenteProps<T>) {
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
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
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
