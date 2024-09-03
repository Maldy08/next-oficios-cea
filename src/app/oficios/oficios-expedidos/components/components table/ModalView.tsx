import { Modal, Box, Typography, Button } from "@mui/material";

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalView = ({ isOpen, onClose }: ModalViewProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ /* tu estilo aquí */ }}>
        <Typography variant="h6">Ver Oficio</Typography>
        {/* Contenido del modal */}
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default ModalView;
