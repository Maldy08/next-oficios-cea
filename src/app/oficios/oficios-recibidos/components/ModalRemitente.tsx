import { useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ModalRemitenteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const ModalRemitente = (props: ModalRemitenteProps) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRemitente, setSelectedRemitente] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.isOpen) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get("/api/oficiousuext");
          const result = response.data.data;
          if (Array.isArray(result)) {
            setData(result);
          } else {
            throw new Error("Los datos no son un array");
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [props.isOpen]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (name: string) => {
    setSelectedRemitente(name);
    setError(null);
  };

  const handleSave = () => {
    if (!selectedRemitente) {
      setError("Debes seleccionar un remitente");
    } else {
      props.onSave(selectedRemitente);
      props.onClose();
      setError(null);
    }
  };

  // Validación de Yup
  const validationSchema = Yup.object({
    remitente: Yup.string().required("Debes seleccionar un remitente"),
    searchText: Yup.string(),
  });

  // Utilizando Formik
  const formik = useFormik({
    initialValues: {
      remitente: "",
      searchText: "",
    },
    validationSchema,
    onSubmit: () => {
      setPage(0);
    },
  });

  const filteredData = Array.isArray(data)
    ? data.filter(
        (row) =>
          row.nombre.toLowerCase().includes(formik.values.searchText.toLowerCase()) ||
          row.empresa.toLowerCase().includes(formik.values.searchText.toLowerCase()) ||
          row.cargo.toLowerCase().includes(formik.values.searchText.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Remitente</h2>
          <form onSubmit={formik.handleSubmit} className="relative w-full max-w-[300px]">
            <input
              type="text"
              name="searchText"
              placeholder="Buscar..."
              value={formik.values.searchText}
              onChange={formik.handleChange}
              className="w-full border-b border-gray-300 py-2 px-3 text-sm rounded-none focus:border-blue-500 focus:outline-none"
            />
            <FaSearch onClick={formik.submitForm} className="absolute right-2 top-2 text-gray-400 cursor-pointer" />
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex-grow overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="font-bold border-b py-2 px-4">NOMBRE COMPLETO</th>
                  <th className="font-bold border-b py-2 px-4">EMPRESA</th>
                  <th className="font-bold border-b py-2 px-4">CARGO</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => handleSelect(row.nombre)}
                    className={`cursor-pointer ${
                      selectedRemitente === row.nombre ? "bg-blue-100" : ""
                    }`}
                  >
                    <td className="border-b py-2 px-4">{row.nombre}</td>
                    <td className="border-b py-2 px-4">{row.empresa}</td>
                    <td className="border-b py-2 px-4">{row.cargo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}

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
            <span className="text-sm">Filas por pág:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={props.onClose}
            className="bg-[#641c34] text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#993233] text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRemitente;
