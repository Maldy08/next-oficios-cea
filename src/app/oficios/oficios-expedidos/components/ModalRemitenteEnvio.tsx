import { FC, useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface ModalRemitenteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const ModalRemitente: FC<ModalRemitenteProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedRemitente, setSelectedRemitente] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/oficiousuext');
        console.log('API Response:', response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      onSave(selectedRemitente);
      onClose();
    }
  };

  const filteredData = data.filter(row =>
    row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    row.empresa.toLowerCase().includes(searchText.toLowerCase()) ||
    row.cargo.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Remitente</h2>
          <div className="relative w-full max-w-[300px]">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={handleSearchChange}
              className="w-full border-b border-gray-300 py-2 px-3 text-sm rounded-none focus:border-blue-500 focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="font-bold border-b py-2 px-4">NOMBRE COMPLETO</th>
                <th className="font-bold border-b py-2 px-4">DEPARTAMENTO</th>
                <th className="font-bold border-b py-2 px-4">CARGO</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(row.nombre)}
                  className={`cursor-pointer ${selectedRemitente === row.nombre ? 'bg-blue-100' : ''}`}
                >
                  <td className="border-b py-2 px-4">{row.nombre}</td>
                  <td className="border-b py-2 px-4">{row.empresa}</td>
                  <td className="border-b py-2 px-4">{row.cargo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleChangePage(Math.max(0, page - 1))}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={page === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => handleChangePage(Math.min(totalPages - 1, page + 1))}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={page >= totalPages - 1}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Folios por pág:</span>
            <select value={rowsPerPage} onChange={handleChangeRowsPerPage} className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRemitente;
