"use client";

import UseOficioR from "../HooksRecibido/useModalOficioRecibido";
import ModalOficio from "./ModalOficio";
import ModalResponsable from "./ModalResponsable";

interface OficiosPageProps {
    remitentes: any[]; // Esto ya existe
    datosEmpleados: any[]; // Asegúrate de agregar esta línea
  }

export default function OficiosPage({
  remitentes,
  datosEmpleados,
}: OficiosPageProps) {
  const { modalType, handleOpenModal, handleCloseModal, handleSave } =
    UseOficioR();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => handleOpenModal("oficioRecibido")}
        className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
      >
        INGRESAR OFICIO RECIBIDOS
      </button>

      {modalType === "oficioRecibido" && (
        <ModalOficio
          isOpen={modalType === "oficioRecibido"}
          onClose={handleCloseModal}
          onSave={handleSave}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
        />
      )}
    </div>
  );
}