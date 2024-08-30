import React, { useState, useEffect, ChangeEvent } from 'react';
import { FiEdit, FiEye, FiList } from 'react-icons/fi';
import ModalList from './components table/ModalList';

interface TablePost {
  id: number;
  title: string;
  folio: string;
  fecha: string;
  remDepen: string;
  tipo: string;
  noOficio: string;
  remNombre: string;
  destNombre: string;
  estatus: string;
}

interface Post {
  id: number;
  title: string;
  folio?: string;
  fecha?: string;
  remDepen?: string;
  tipo?: string;
  noOficio?: string;
  remNombre?: string;
  destNombre?: string;
  estatus?: string;
}

interface TableProps {
  modalType: string | null;
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string;
  data: Post[];
}

const TableComponent: React.FC<TableProps> = ({ modalType, setModalType, searchTerm, data = [] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRows, setFilteredRows] = useState<TablePost[]>([]);
  const [ismodalopenList, setismodalopenList] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      const tableData: TablePost[] = data.map(post => ({
        id: post.id,
        title: post.title,
        folio: post.folio || '',
        fecha: post.fecha || '',
        remDepen: post.remDepen || '',
        tipo: post.tipo || '',
        noOficio: post.noOficio || '',
        remNombre: post.remNombre || '',
        destNombre: post.destNombre || '',
        estatus: post.estatus || '',
      }));
      setFilteredRows(tableData);
    } else {
      console.error('Data is not an array:', data);
      setFilteredRows([]);
    }
  }, [data]);

  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const modalopenList = () => {
    setismodalopenList(true);
  };

  const modalcloseList = () => {
    setismodalopenList(false);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsToDisplay = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-semibold text-left">ACCIONES</th>
              <th className="py-2 px-4 font-semibold text-left">NO. FOLIO</th>
              <th className="py-2 px-4 font-semibold text-left">FECHA</th>
              <th className="py-2 px-4 font-semibold text-left">DEPENDENCIA</th>
              <th className="py-2 px-4 font-semibold text-left">TIPO</th>
              <th className="py-2 px-4 font-semibold text-left">NO DE OFICIO</th>
              <th className="py-2 px-4 font-semibold text-left">REMITENTE</th>
              <th className="py-2 px-4 font-semibold text-left">DESTINATARIO</th>
              <th className="py-2 px-4 font-semibold text-left">ESTATUS</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">No hay datos disponibles</td>
              </tr>
            ) : (
              rowsToDisplay.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal('edit')}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleOpenModal('view')}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={modalopenList}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiList />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">{row.folio}</td>
                  <td className="py-2 px-4">{new Date(row.fecha).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{row.remDepen}</td>
                  <td className="py-2 px-4">{row.tipo}</td>
                  <td className="py-2 px-4">{row.noOficio}</td>
                  <td className="py-2 px-4">{row.remNombre}</td>
                  <td className="py-2 px-4">{row.destNombre}</td>
                  <td className="py-2 px-4">{row.estatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4">
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="mr-4 p-2 border border-gray-300 rounded-md"
        >
          <option value={5}>5 filas</option>
          <option value={10}>10 filas</option>
          <option value={25}>25 filas</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="p-2 border border-gray-300 rounded-md"
          >
            Anterior
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= filteredRows.length}
            className="p-2 border border-gray-300 rounded-md"
          >
            Siguiente
          </button>
        </div>
      </div>

      {ismodalopenList && (
        <ModalList
          isOpen={ismodalopenList}
          onClose={modalcloseList}
        />
      )}
    </div>
  );
};

export default TableComponent;
