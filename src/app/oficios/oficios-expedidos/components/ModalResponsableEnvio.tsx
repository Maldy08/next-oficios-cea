import { FC, useState } from "react";
import { InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ModalResponsableProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const mockData = [
  { nombre: "Juan Pérez", departamento: "Administración", puesto: "Jefe" },
  { nombre: "Ana Gómez", departamento: "Recursos Humanos", puesto: "Analista" },
  { nombre: "Luis Martínez", departamento: "IT", puesto: "Desarrollador" },
  // Agrega más datos si es necesario
];

const ModalResponsableEnvio: FC<ModalResponsableProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedResponsable, setSelectedResponsable] = useState<string | null>(null);

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

  const filteredData = mockData.filter(row =>
    row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    row.departamento.toLowerCase().includes(searchText.toLowerCase()) ||
    row.puesto.toLowerCase().includes(searchText.toLowerCase())
  );

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
                  onClick={() => handleRowClick(row.nombre)}
                  selected={selectedResponsable === row.nombre}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: selectedResponsable === row.nombre ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
                  }}
                >
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.departamento}</TableCell>
                  <TableCell>{row.puesto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

        <div className="flex justify-end mt-4 gap-2">
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalResponsableEnvio;
