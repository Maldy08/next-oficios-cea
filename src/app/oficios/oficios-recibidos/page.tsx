"use client";

import { useState } from "react";
import ModalOficio from "./components/ModalOficio";

export default function OficiosRecibidosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los datos
    console.log("Datos guardados");
    handleCloseModal();
  };

  return (
    <div className="p-6">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Abrir Modal
      </button>

      <ModalOficio
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
