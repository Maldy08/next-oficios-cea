import React from 'react';
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ModalRemitenteProps {
  isOpen: boolean;
  onClose: () => void;
}

const data = [
  { nombre: 'Juan Pérez', empresa: 'Acme Corp', puesto: 'Gerente' },
  { nombre: 'Ana García', empresa: 'Tech Solutions', puesto: 'Desarrolladora' },
  { nombre: 'Luis Fernández', empresa: 'Innovatech', puesto: 'Analista' },
  { nombre: 'Laura Rodríguez', empresa: 'Business Inc', puesto: 'Consultora' },
  { nombre: 'Carlos Martínez', empresa: 'FinTech', puesto: 'Director' },
  { nombre: 'Sofia López', empresa: 'HealthPlus', puesto: 'Coordinadora' },
  { nombre: 'David Gómez', empresa: 'Retail Co', puesto: 'Vendedor' },
  { nombre: 'Marta Jiménez', empresa: 'EduTech', puesto: 'Educadora' },
  { nombre: 'Jorge Moreno', empresa: 'Creative Agency', puesto: 'Creativo' },
  { nombre: 'Patricia Morales', empresa: 'Logistics LLC', puesto: 'Logística' }
];

const ModalRemitente: React.FC<ModalRemitenteProps> = ({ isOpen, onClose }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = React.useState('');

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

  // Filtrar los datos según el texto de búsqueda
  const filteredData = data.filter(row =>
    row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    row.empresa.toLowerCase().includes(searchText.toLowerCase()) ||
    row.puesto.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        sx={{
          width: '80%',
          maxWidth: '800px',
          height: '80vh',
          maxHeight: '600px',
          margin: 'auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography 
              variant="h6" 
              id="modal-title" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 'bold' // Esto pone el texto en negrita
              }}
            >
              Personal Externo
            </Typography>
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

          <TableContainer sx={{ flexGrow: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>NOMBRE DE LA PERSONA</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>EMPRESA / DEPENDENCIA</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>PUESTO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.empresa}</TableCell>
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="contained" color="error" sx={{ marginRight: 1, fontSize: '0.75rem' }} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" sx={{ fontSize: '0.75rem' }}>
              Guardar
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

export default ModalRemitente;
