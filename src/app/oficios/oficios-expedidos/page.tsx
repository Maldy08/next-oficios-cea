"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableComponent from "./components/table";
import ModalOficioExpedido from "./components/ModalOficioExpedido";
import ModalEdit from "./components/components table/ModalEdit";
import ModalList from "./components/components table/ModalList";

export default function OficiosExpedidosPage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ismodalopenList, setismodalopenList] = useState(false);


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
      <h1 className="text-lg font-bold mb-4">Oficios-Expedidos</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleOpenModal('oficioExpedido')}
          className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          INGRESAR OFICIO EXPEDIDO
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
        modalType={modalType} //prop que contiene un valor ya sea un texto o un numero
        setModalType={setModalType} 
        searchTerm={searchTerm}  
      />

      {/* Aqui estan los Modales */}
      {modalType === 'oficioExpedido' && (
        <ModalOficioExpedido
          isOpen={modalType === 'oficioExpedido'}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {modalType === 'edit' && (
        <ModalEdit
          isOpen={modalType === 'edit'}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

{ismodalopenList && (
        <ModalList
          isOpen={ismodalopenList}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
}
