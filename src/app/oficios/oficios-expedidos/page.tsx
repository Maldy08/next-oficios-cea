"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, TablePagination, InputAdornment, Box, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModalOficioExpedido from "./components/ModalOficioExpedido";


export default function OficiosExpedidosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = Array.from({ length: 20 }, (_, i) => ({
    noFolio: 198 - i,
    fecha: `22/02/202${2 - Math.floor(i / 10)}`,
    dependencia: i % 2 === 0 ? "CEA" : "SEPROA",
    tipo: `${1 + (i % 3)}`,
    noDeOficio: `B/${57 - i}`,
    remitente: `ING. FRANCISCO A. BERNAL RODRÍGUEZ`,
    destinatario: `DESTINATARIO ${i + 1}`,
    estatus: `ENTREGADO CON ACUSE`,
  }));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Título de la página con tamaño reducido */}
      <Typography variant="h6" component="h1" sx={{ marginBottom: '0px', fontWeight: 'bold' }}>
        Oficios-Expedidos
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Button
  onClick={handleOpenModal}
  variant="contained"
  disableRipple
  sx={{
    backgroundColor: '#993233 !important', // Usar !important para forzar el color
    ':hover': {
      backgroundColor: '#993233 !important', // Mantener el mismo color en hover y usar !important
    },
    ':focus': {
      backgroundColor: '#993233 !important', // Asegurar que el color se mantenga en foco
    },
    color: 'white !important', // Forzar el color del texto
  }}
>
  INGRESAR OFICIO EXPEDIDO
</Button>


        <TextField
          variant="outlined"
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '50%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="oficios expedidos" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NO. FOLIO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>FECHA</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DEPENDENCIA</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>TIPO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NO DE OFICIO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>REMITENTE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DESTINATARIO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ESTATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><ListAltIcon fontSize="small" /></IconButton>
                </TableCell>
                <TableCell>{row.noFolio}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.dependencia}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.noDeOficio}</TableCell>
                <TableCell>{row.remitente}</TableCell>
                <TableCell>{row.destinatario}</TableCell>
                <TableCell>{row.estatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', alignItems: 'center' }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </Box>

      <ModalOficioExpedido
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
