import { FC, useState } from "react";
import { InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedDestinatario: string) => void;
}

const data = [
  { nombre: 'Juan Pérez', departamento: 'Acme Corp', puesto: 'Gerente' },
  { nombre: 'Ana García', departamento: 'Tech Solutions', puesto: 'Desarrolladora' },
  { nombre: 'Carlos López', departamento: 'Finanzas Globales', puesto: 'Analista Financiero' },
  { nombre: 'Marta Rodríguez', departamento: 'Salud y Bienestar', puesto: 'Médico' },
  { nombre: 'Luis Fernández', departamento: 'Ingeniería Innovadora', puesto: 'Ingeniero de Software' },
  { nombre: 'Lucía Martínez', departamento: 'Educación Avanzada', puesto: 'Profesora' },
  { nombre: 'Diego Gómez', departamento: 'Marketing Creativo', puesto: 'Director de Marketing' },
  { nombre: 'Elena Torres', departamento: 'Recursos Humanos', puesto: 'Especialista en RRHH' },
  { nombre: 'Pablo Herrera', departamento: 'Consultoría Empresarial', puesto: 'Consultor' },
  { nombre: 'Clara Morales', departamento: 'Tecnología Verde', puesto: 'Ingeniera Ambiental' },
];

const ModalDestinatario: FC<ModalDestinatarioProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedDestinatario, setSelectedDestinatario] = useState<string>("");

  const handleRowClick = (nombre: string) => {
    setSelectedDestinatario(nombre);
  };

  const handleSaveClick = () => {
    onSave(selectedDestinatario);
    onClose();
  };

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

  const filteredData = data.filter(row =>
    row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    row.departamento.toLowerCase().includes(searchText.toLowerCase()) ||
    row.puesto.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Personal Interno</h2>
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
                  selected={selectedDestinatario === row.nombre}
                  style={{ cursor: 'pointer' }}
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
          <Button onClick={onClose} variant="contained" color="error">
            Cerrar
          </Button>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDestinatario;
