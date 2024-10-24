"use client";

import TableComponent from "../../oficios-expedidos/components/table";
import UseOficioR from "../HooksRecibido/UseOficioRecibidos";
import ModalOficio from "./ModalOficio";
import Modal from "./ModalPDF"; // Asegúrate de que este sea el nombre correcto
import UseClienteComponent from "../../oficios-expedidos/Hooks/UseClientComponent";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { createOficio } from "@/app/infrastructure/data-access/oficios/create-oficios";
import { updateOficio } from "@/app/infrastructure/data-access/oficios/update-oficio ";
import { createOficioResponsable } from "@/app/infrastructure/data-access/oficios-responsable/create-oficios-responsable";

interface OficiosPageProps {
  remitentes: any[];
  datosEmpleados: any[];
  rows: any[];
}

export default function OficiosRecibidos({
  remitentes,
  datosEmpleados,
  rows,
}: OficiosPageProps) {
  const {
    modalType,
    handleOpenModal,
    handleCloseModal,
    openModal,
    edit,
    setEdit,
  } = UseOficioR();

  const { searchTerm, paginatedRows, handleSearchChange } = UseClienteComponent({
    rows,
  });

  const [selectedRow, setSelectedRow] = useState(null); // Estado para la fila seleccionada
  const [pdfUrl, setPdfUrl] = useState(''); // Estado para la URL del PDF

  const handleEdit = (rowData: any) => {
    setSelectedRow(rowData); // Guarda los datos de la fila seleccionada
    handleOpenModal("edit"); // Cambié aquí para especificar el tipo
    setEdit(true); // Abre el modal en modo edición
  };

  const handleSave = async (oficio: any) => {
    await createOficio(oficio); // Usa createOficio para crear
  };
  
  const handleEdito = async (oficio: any) => {
    await updateOficio(oficio); // Usa updateOficio para actualizar
  };

  const handleSaveOficiosResponsable = async (oficioResponsable: any) => {
    await createOficioResponsable(oficioResponsable);
  };

  // Modificado para manejar la apertura del modal con la URL del PDF
  const handleOpenModalWithPDF = (type: string, url?: string) => {
    if (type === "view" && url) {
      setPdfUrl(url); // Establece la URL del PDF
    }
    handleOpenModal(type); // Llama a la función original
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            handleOpenModal("create"); // Cambié aquí para especificar el tipo
            setEdit(false);
          }}
          className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          INGRESAR OFICIO RECIBIDOS
        </button>
        <div className="w-1/2 relative">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded pl-10"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <TableComponent
        rows={paginatedRows}
        handleOpenModal={handleOpenModalWithPDF} // Usa la nueva función
        handleCloseModal={handleCloseModal}
        modalType={modalType}
        datosEmpleados={datosEmpleados}
        editado={true}
        handleEdit={handleEdit}
      />

      {openModal && modalType === "view" && pdfUrl && ( // Muestra el modal solo si hay URL
        <Modal
          url={pdfUrl} // Pasa la URL del PDF
          onClose={handleCloseModal}
        />
      )}

      {openModal && modalType !== "view" && ( // Muestra el ModalOficio para otros tipos
        <ModalOficio
          isOpen={openModal}
          onClose={handleCloseModal}
          onSave={handleSave}
          onEdito={handleEdito}
          onSaveOficiosResponsable={handleSaveOficiosResponsable}
          datosEmpleados={datosEmpleados}
          remitentes={remitentes}
          esNuevo={!edit}
          esEditar={edit}
          rowData={selectedRow}
        />
      )}
    </>
  );
}
