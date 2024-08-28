import { FC, useState, useEffect } from "react";
import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  CircularProgress,
  Box,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedName: string) => void;
}

const ModalDestinatario: FC<ModalDestinatarioProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]); // Asegúrate de que `data` sea un array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        setError(null); // Resetear el error antes de la llamada a la API
        try {
          const response = await fetch('/api/empleados'); // Cambia la URL a la ruta de tu API
          if (!response.ok) {
            throw new Error('Error en la llamada a la API');
          }
          const result = await response.json();

          // Verifica y ajusta la respuesta
          if (Array.isArray(result)) {
            setData(result);
          } else if (typeof result === 'object' && result.data && Array.isArray(result.data)) {
            setData(result.data); // Ajuste si la API devuelve un objeto con un campo de datos
          } else {
            throw new Error('Datos de API no son un array');
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0); // Resetear la página al buscar
  };

  const handleRowClick = (name: string) => {
    setSelectedName(name);
  };

  const handleSave = () => {
    if (selectedName) {
      onSave(selectedName); // Pasar el nombre seleccionado al onSave
    }
  };

  // Verifica que `data` sea un array antes de filtrar
  const filteredData = Array.isArray(data) ? data.filter(row => {
    const nombreCompleto = row.nombreCompleto || '';
    const descripcionDepto = row.descripcionDepto || '';
    const descripcionPuesto = row.descripcionPuesto || '';

    const search = searchText.toLowerCase();
    return nombreCompleto.toLowerCase().includes(search) ||
      descripcionDepto.toLowerCase().includes(search) ||
      descripcionPuesto.toLowerCase().includes(search);
  }) : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative mx-4 sm:mx-0 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Personal Interno</h2>
          <TextField
            variant="standard"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleSearchChange}
            sx={{
              width: '100%',
              maxWidth: '300px',
              '& .MuiInputBase-root': {
                borderBottom: '1px solid gray',
                borderRadius: 0,
              },
              '& .MuiInputBase-input': {
                padding: '6px 0',
                fontSize: '0.875rem',
              },
              '& .MuiInputAdornment-root': {
                color: 'gray',
              },
              '& .MuiInputBase-root.Mui-focused': {
                borderBottom: '1px solid blue',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {!loading && !error && (
          <TableContainer className="flex-grow overflow-auto">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>NOMBRE COMPLETO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>DEPARTAMENTO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>PUESTO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(row.nombreCompleto)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: row.nombreCompleto === selectedName ? '#f0f0f0' : 'inherit'
                    }}
                  >
                    <TableCell>{row.nombreCompleto || ''}</TableCell>
                    <TableCell>{row.descripcionDepto || ''}</TableCell>
                    <TableCell>{row.descripcionPuesto || ''}</TableCell> 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Folios por pág."
          rowsPerPageOptions={[5, 10]}
          sx={{ overflowX: 'auto' }}
        />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded"
            style={{ backgroundColor: '#ef4444', borderColor: 'transparent' }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            style={{ backgroundColor: '#3b82f6', borderColor: 'transparent' }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDestinatario;
