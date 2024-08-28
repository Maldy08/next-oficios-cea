// components/Table.tsx

import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TablePagination, Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModalOficioExpedido from "./ModalOficioExpedido";
import ModalEdit from "./components table/ModalEdit";
import ModalList from "./components table/ModalList";

interface TableProps {
  modalType: string | null;
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string;
}

const TableComponent: React.FC<TableProps> = ({ modalType, setModalType, searchTerm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [ismodalopenList, setismodalopenList] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/oficios')
      .then(response => response.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setRows(data.data);
          setFilteredRows(data.data);
        } else {
          console.error('La respuesta de la API no contiene un array en la propiedad "data":', data);
          setRows([]);
          setFilteredRows([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setRows([]);
        setFilteredRows([]);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(row =>
        Object.values(row).some(value =>
          value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }
  }, [searchTerm, rows]);

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

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
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

      {/* Modales */}
      {modalType === 'oficioExpedido' && (
        <ModalOficioExpedido
          isOpen={modalType === 'oficioExpedido'}
          onClose={handleCloseModal}
          onSave={() => console.log("Datos guardados")}
        />
      )}

      {modalType === 'edit' && (
        <ModalEdit
          isOpen={modalType === 'edit'}
          onClose={handleCloseModal}
          onSave={() => console.log("Datos guardados")}
        />
      )}

      <ModalList isOpen={ismodalopenList} onClose={modalcloseList} />
    </div>
  );
};

export default TableComponent;
