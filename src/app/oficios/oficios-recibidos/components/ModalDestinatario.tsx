import { FC, useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import useModalOficioR1 from "../HooksRecibido/UseTablasModal";
import TableComponentModales from "../../oficios-expedidos/components/TablecomponentModales";

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  //idExterno: number;
  deptoComi: number;
  empleado: number
}

interface Remitente {
  nombre: string;
  empresa: string;
  cargo: string;
  siglas: string;
  deptoComi: number;
  empleado: number;
}

interface ModalDestinatarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (remitente: Remitente | Empleados) => void;
  datosEmpleados: Empleados[];
  remitentes: Remitente[];
  tipoDestinatario: string;
  tipo: string;
}

const ModalDestinatario = (props: ModalDestinatarioProps) => {
  const data =
    props.tipoDestinatario === "1" ? props.datosEmpleados : props.remitentes;

  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    selectedItem,
    handleRowClick,
  } = useModalOficioR1({
    data,
    columnsToFilter:
      props.tipoDestinatario === "1"
        ? ["nombreCompleto", "descripcionDepto", "descripcionPuesto"]
        : ["nombre", "empresa", "siglas", "cargo"],
    onClose: props.onClose,
    onSave: props.onSave, // Dejamos que onSave venga desde los props
  });
  

  const columns = [
    {
      header: "Nombre Completo",
      accessor: (row: Remitente | Empleados) =>
        "nombreCompleto" in row ? row.nombreCompleto : row.nombre,
    },
    {
      header: "Departamento",
      accessor: (row: Remitente | Empleados) => {
        if (props.tipoDestinatario === "1") {
          // Interno
          if (props.tipo === "1") {
            return "COMISION ESTATAL DEL AGUA";
          } else if (props.tipo === "2") {
            return "SECRETARÍA PARA EL MANEJO, SANEAMIENTO Y PROTECCIÓN DEL AGUA DE BAJA CALIFORNIA";
          }
        }
        // Externo
        return "empresa" in row ? row.empresa : row.descripcionDepto;
      },
    },
    {
      header: "Siglas",
      accessor: (row: Remitente | Empleados) => {
        if (props.tipoDestinatario === "1") {
          // Interno
          return props.tipo === "1" ? "CEA" : "SEPROA";
        }
        // Externo
        return "siglas" in row ? row.siglas : "";
      },
    },
    {
      header: "Puesto",
      accessor: (row: Remitente | Empleados) =>
        "descripcionPuesto" in row ? row.descripcionPuesto : row.cargo,
    },
  ];

  if (!props.isOpen) return null;

  function onSave() {
    if (selectedItem) {
      props.onSave(selectedItem); // Guardamos el remitente seleccionado
      props.onClose(); // Cerramos el modal
    }
  }

  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${
        props.isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">
            Personal Interno
          </h2>
          <div className="relative w-full max-w-[300px]">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 text-sm rounded-none focus:border-blue-500 focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <TableComponentModales<Empleados | Remitente>
          data={paginatedData}
          columns={columns}
          onRowClick={handleRowClick}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        ></TableComponentModales>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={props.onClose}
            className="bg-[#641c34] text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="bg-[#993233] text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDestinatario;
