"use client";

import { useState } from "react";
import ModalOficioExpedido from "./components/ModalOficioExpedido";

export default function OficiosExpedidosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="p-6">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Abrir Modal OFICIOS EXPEDIDOS
      </button>

      <ModalOficioExpedido
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
