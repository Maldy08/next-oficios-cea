"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MessageIcon from "@mui/icons-material/Message";

interface ModalListProps {
  isOpen: boolean;
  onClose: () => void;
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ModalList: React.FC<ModalListProps> = ({ isOpen, onClose }) => {
  const todayDate = getCurrentDate();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Bitacora del Oficio</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Folio"
                defaultValue=""
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <div className="flex items-center space-x-4">
                <label>CEA</label>
                <input type="radio" name="selection" className="mr-4" />
                <label>SEPRA</label>
                <input type="radio" name="selection" />
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className="mt-4">
                <label className="font-bold">Fecha: </label>
                <span>{todayDate}</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Número de Oficio"
                defaultValue=""
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Fecha Oficio"
                type="date"
                defaultValue="2000-00-00"
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <CalendarTodayIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Fecha Límite"
                type="date"
                defaultValue="2000-00-00"
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <CalendarTodayIcon />,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Remitente"
                defaultValue=""
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <PersonIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destinatario"
                defaultValue=""
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <PersonIcon />,
                }}
              />
            </Grid>
          </Grid>

          <TextField
            label="Tema del Oficio"
            defaultValue=""
            fullWidth
            variant="outlined"
            margin="dense"
            InputProps={{
              startAdornment: <MessageIcon />,
            }}
          />

          <div className="flex items-center space-x-4">
            <TextField
              label="Capture Bitacora"
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <IconButton color="primary" aria-label="add">
              <Button className="bg-[#641c34] text-white lg:hover:bg-[#641c34]">
                Ingresar
                <AddIcon />
              </Button>
            </IconButton>
          </div>

          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Estatus</TableCell>
                  <TableCell>Comentarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    fecha: "2022-03-01",
                    usuario: "7130",
                    estatus: "3",
                    comentarios: "FUE ATENDIDO SATISFACTORIAMENTE",
                  },
                  {
                    fecha: "2022-03-01",
                    usuario: "7130",
                    estatus: "1",
                    comentarios: "SE TURNA AL AREA CORRESPONDIENTE",
                  },
                  {
                    fecha: "2024-03-11",
                    usuario: "7197",
                    estatus: "1",
                    comentarios: "GFHFGHFGH",
                  },
                  {
                    fecha: "2024-03-11",
                    usuario: "7197",
                    estatus: "1",
                    comentarios: "HHHHHHHHHHH",
                  },
                  {
                    fecha: "2024-07-15",
                    usuario: "7197",
                    estatus: "1",
                    comentarios: "121",
                  },

                  {
                    fecha: "2024-07-15",
                    usuario: "7197",
                    estatus: "1",
                    comentarios: "8657867876",
                  },
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.usuario}</TableCell>
                    <TableCell>{row.estatus}</TableCell>
                    <TableCell>{row.comentarios}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="bg-[#641c34] text-white lg:hover:bg-[#641c34]"
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalList;
