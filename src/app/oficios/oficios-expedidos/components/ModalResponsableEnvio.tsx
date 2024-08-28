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
  Typography,
  Button
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ModalResponsableProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const ModalResponsableEnvio: FC<ModalResponsableProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedResponsable, setSelectedResponsable] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/empleados');
          if (!response.ok) {
            throw new Error('Error en la llamada a la API');
          }
          const result = await response.json();

          // Ajusta el manejo de datos según el formato de respuesta de la API
          if (Array.isArray(result)) {
            setData(result);
          } else if (typeof result === 'object' && result.data && Array.isArray(result.data)) {
            setData(result.data);
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
    setPage(0);
  };

  const handleRowClick = (name: string) => {
    setSelectedResponsable(name);
  };

  const handleSave = () => {
    if (selectedResponsable) {
      onSave(selectedResponsable);
      onClose();
    }
  };

  // Filtra los datos asegurándose de que `data` es un array
  const filteredData = Array.isArray(data) ? data.filter(row =>
    (row.nombreCompleto || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (row.descripcionDepto || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (row.descripcionPuesto || '').toLowerCase().includes(searchText.toLowerCase())
  ) : [];

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Responsable</h2>
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
                    onClick={() => handleRowClick(row.nombreCompleto || '')}
                    selected={selectedResponsable === row.nombreCompleto}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: selectedResponsable === row.nombreCompleto ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
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
            className="bg-[#641c34] text-white py-2 px-4 rounded"
            style={{ backgroundColor: '#641c34', borderColor: 'transparent' }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#993233] text-white py-2 px-4 rounded"
            style={{ backgroundColor: '#993233', borderColor: 'transparent' }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResponsableEnvio;
