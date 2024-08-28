"use client";

import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, TablePagination, InputAdornment, Box, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModalOficioExpedido from "./components/ModalOficioExpedido"; 
import ModalEdit from "./components/components table/ModalEdit";
import ModalList from "./components/components table/ModalList";

export default function OficiosExpedidosPage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any[]>([]);
  const [ismodalopenList, setismodalopenList] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/oficios')
      .then(response => response.json())
      .then(data => {
        console.log('Datos de la API:', data);
        if (data.data && Array.isArray(data.data)) {
          setRows(data.data);
        } else {
          console.error('La respuesta de la API no contiene un array en la propiedad "data":', data);
          setRows([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setRows([]);
      });
  }, []);

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

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  console.log('Filtered Rows:', filteredRows); // Verifica los datos filtrados

  return (
    <div className="p-6">
      <Typography variant="h6" component="h1" sx={{ marginBottom: '0px', fontWeight: 'bold' }}>
        Oficios-Expedidos
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Button
          onClick={() => handleOpenModal('oficioExpedido')}
          variant="contained"
          disableRipple
          sx={{
            backgroundColor: '#993233 !important',
            ':hover': {
              backgroundColor: '#993233 !important',
            },
            ':focus': {
              backgroundColor: '#993233 !important',
            },
            color: 'white !important',
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
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: '8px' }}>
  <Box sx={{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '8px',
  }}>
    <IconButton
      size="small"
      onClick={() => handleOpenModal('edit')}
      sx={{ padding: '8px' }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
    <IconButton
      size="small"
      onClick={() => handleOpenModal('view')}
      sx={{ padding: '8px' }}
    >
      <VisibilityIcon fontSize="small" />
    </IconButton>
    <IconButton
      size="small"
      onClick={modalopenList}
      sx={{ padding: '8px' }}
    >
      <ListAltIcon fontSize="small" />
    </IconButton>
  </Box>
</TableCell>




                  <TableCell>{row.folio}</TableCell>
                  <TableCell>{new Date(row.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{row.remDepen}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.noOficio}</TableCell>
                  <TableCell>{row.remNombre}</TableCell>
                  <TableCell>{row.destNombre}</TableCell>
                  <TableCell>{row.estatus}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <ModalList isOpen={ismodalopenList} onClose={modalcloseList} />
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

      {/* ModalOficioExpedido */}
      {modalType === 'oficioExpedido' && (
        <ModalOficioExpedido
          isOpen={modalType === 'oficioExpedido'}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {/* ModalEdit */}
      {modalType === 'edit' && (
        <ModalEdit
          isOpen={modalType === 'edit'}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
