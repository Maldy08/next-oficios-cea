import { FC, useState } from "react";
import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedName: string) => void;
}

const data = [
  { nombre: 'María Fernández', departamento: 'Global Solutions', puesto: 'Jefa de Proyecto' },
  { nombre: 'Pedro Gómez', departamento: 'Tech Innovations', puesto: 'Ingeniero de Software' },
  { nombre: 'Carmen Martínez', departamento: 'FinSolve', puesto: 'Analista Financiero' },
  { nombre: 'Luis Pérez', departamento: 'EcoTech', puesto: 'Director de Operaciones' },
  { nombre: 'Sonia Morales', departamento: 'MedTech', puesto: 'Especialista en Salud' },
  { nombre: 'Rafael Sánchez', departamento: 'LogiCore', puesto: 'Coordinador de Logística' },
  { nombre: 'Elena Castro', departamento: 'EduSmart', puesto: 'Educadora' },
  { nombre: 'Fernando Ruiz', departamento: 'Creative Minds', puesto: 'Diseñador Gráfico' },
  { nombre: 'Patricia López', departamento: 'RetailPro', puesto: 'Gerente de Ventas' },
  { nombre: 'Carlos Ortega', departamento: 'HealthCare Inc', puesto: 'Consultor' }
];

const ModalDestinatario: FC<ModalDestinatarioProps> = ({ isOpen, onClose, onSave }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);

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

  const filteredData = data.filter(row =>
    row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    row.departamento.toLowerCase().includes(searchText.toLowerCase()) ||
    row.puesto.toLowerCase().includes(searchText.toLowerCase())
  );

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
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: row.nombre === selectedName ? '#f0f0f0' : 'inherit'
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
            onClick={handleSave}  // Aquí se usa handleSave en lugar de onSave
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
