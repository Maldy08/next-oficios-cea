import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useModalOficioR1 from "../HooksRecibido/UseTablasModal";
import TableComponentModales from "../../oficios-expedidos/components/TablecomponentModales";
import { OficioResponsable } from "@/app/domain/entities/oficioResposable";

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  deptoComi: number;
  empleado: number;
}

interface ModalResponsableProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (datosEmpleados: Empleados) => void;
  datosEmpleados: Empleados[];
  tipo: string;
  handleOficioResponsable: (oficioResponsable: OficioResponsable) => void;
}

const ModalResponsable = (props: ModalResponsableProps) => {
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
    data: props.datosEmpleados,
    columnsToFilter: [
      "nombreCompleto",
      "descripcionDepto",
      "descripcionPuesto",
      "deptoComi",
    ],
    onClose: props.onClose,
    onSave: props.onSave, // Dejamos que onSave venga desde los props
  });

  const departamento =
    props.tipo === "1"
      ? "COMISION ESTATAL DEL AGUA"
      : "SECRETARÍA PARA EL MANEJO, SANEAMIENTO Y PROTECCIÓN DEL AGUA DE BAJA CALIFORNIA";
  const siglas = props.tipo === "1" ? "CEA" : "SEPROA";

  const columns = [
    {
      header: "Nombre Completo",
      accessor: (row: Empleados) => row.nombreCompleto,
    },
    {
      header: "Departamento",
      accessor: () => departamento, // Muestra siempre el departamento seleccionado
    },
    {
      header: "Siglas",
      accessor: () => siglas, // Muestra siempre las siglas seleccionadas
    },
    {
      header: "Puesto",
      accessor: (row: Empleados) => row.descripcionPuesto,
    },
  ];

  if (!props.isOpen) return null;

  function onSave() {
    if (selectedItem) {
/*       props.oficioResponsable.push({
        ejercicio : 2024,
        eor : 2,
        folio: 1,
        idEmpleado: selectedItem.empleado,
        rol: 1,
      }) */
      props.handleOficioResponsable({
        ejercicio: 2024,
        eor: 2,
        folio: 1,
        idEmpleado: selectedItem.empleado,
        rol: 1,
      });
      props.onSave(selectedItem); // Guardamos el remitente seleccionado
      props.onClose(); // Cerramos el modal
    }
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${props.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="bg-white w-full max-w-4xl h-[80vh] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Seleccionar Responsable</h2>
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
        <TableComponentModales<Empleados>
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
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
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

export default ModalResponsable;