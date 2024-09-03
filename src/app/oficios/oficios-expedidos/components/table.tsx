import React from "react";
import { FiEdit, FiEye, FiList } from "react-icons/fi";

interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

interface TableProps {
  rows: Array<{
    folio: string;
    fecha: string;
    remDepen: string;
    tipo: string;
    noOficio: string;
    remNombre: string;
    destNombre: string;
    estatus: string;
  }>;
  handleOpenModal: (type: string) => void;
  handleCloseModal: () => void;
  modalType: string | null;
  datosEmpleados: Empleados[];
}

const TableComponent = ({
  rows,
  handleOpenModal,
  handleCloseModal,
  modalType,
  datosEmpleados,
}: TableProps) => {
  return (
    <div className="">
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-semibold text-left">ACCIONES</th>
              <th className="py-2 px-4 font-semibold text-left">NO. FOLIO</th>
              <th className="py-2 px-4 font-semibold text-left">FECHA</th>
              <th className="py-2 px-4 font-semibold text-left">DEPENDENCIA</th>
              <th className="py-2 px-4 font-semibold text-left">TIPO</th>
              <th className="py-2 px-4 font-semibold text-left">NO DE OFICIO</th>
              <th className="py-2 px-4 font-semibold text-left">REMITENTE</th>
              <th className="py-2 px-4 font-semibold text-left">DESTINATARIO</th>
              <th className="py-2 px-4 font-semibold text-left">ESTATUS</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              rows.map(
                (
                  { folio, fecha, remDepen, tipo, noOficio, remNombre, destNombre, estatus },
                  index
                ) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal("edit")}
                          className="text-gray-600 hover:text-primary-900"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleOpenModal("view")}
                          className="text-gray-600 hover:text-primary-900"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => handleOpenModal("list")}
                          className="text-gray-600 hover:text-primary-900"
                        >
                          <FiList />
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4">{folio}</td>
                    <td className="py-2 px-4">
                      {new Date(fecha).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">{remDepen}</td>
                    <td className="py-2 px-4">{tipo}</td>
                    <td className="py-2 px-4">{noOficio}</td>
                    <td className="py-2 px-4">{remNombre}</td>
                    <td className="py-2 px-4">{destNombre}</td>
                    <td className="py-2 px-4">{estatus}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
