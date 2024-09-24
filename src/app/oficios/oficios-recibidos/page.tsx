import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";
import { getOficioUsuExternos } from "@/app/infrastructure/data-access/oficiousuexterno/get-oficio-usu-externo.data-access";
import { getEmpleados } from "@/app/infrastructure/data-access/empleados/get-empleados";
import { getOficios } from "@/app/infrastructure/data-access/oficios/get-oficios";
import {
  Departamentos,
  OficioUsuExterno,
  Empleados,
  Oficios,
} from "@/app/domain/entities";

import { useState } from "react";
import ModalOficio from "./components/ModalOficio";

export default async function OficiosRecibidosPage() {
  const departamentos: Departamentos[] = await getDepartamentos();
  const oficiosExternos: OficioUsuExterno[] = await getOficioUsuExternos();
  const empleados: Empleados[] = await getEmpleados();
  const oficios: Oficios[] = await getOficios();

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
