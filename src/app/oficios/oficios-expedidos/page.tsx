// app/oficios-expedidos/page.tsx

"use client";

import { useState } from "react";
import {
  Button, TextField, InputAdornment, Box, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ModalOficioExpedido from "./components/ModalOficioExpedido";
import ModalEdit from "./components/components table/ModalEdit";
import TableComponent from "./components/table";

export default function OficiosExpedidosPage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOpenModal = (type: string) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSave = () => {
    console.log("Datos guardados");
    handleCloseModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
          value={searchTerm}
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

      <TableComponent
        modalType={modalType}
        setModalType={setModalType}
        searchTerm={searchTerm}
      />

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
