import { Oficios } from "@/app/domain/entities";
import React from "react";
import { FiEdit, FiEye, FiList } from "react-icons/fi";
import ModalPersonaEnvio from "./ModalResponsableEnvio";
interface Empleados {
  nombreCompleto: string;
  descripcionDepto: string;
  descripcionPuesto: string;
  idPue: number;
}

interface Nada {}

interface TableProps {
  rows: Oficios[];
  handleOpenModal: (type: string) => void;
  handleCloseModal: () => void;
  modalType: string | null;
  datosEmpleados: Empleados[];
}

const TableComponent = (props: TableProps) => {
  return (
    <div className="">
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-semibold text-left">ACCIONES</th>
              <th className="py-2 px-4 font-semibold text-left">NO. FOLIO</th>
              <th className="py-2 px-4 font-semibold text-left">FECHA</th>
              <th className="py-2 px-4 font-semibold text-left">DEPENDENCIA</th>
              <th className="py-2 px-4 font-semibold text-left">TIPO</th>
              <th className="py-2 px-4 font-semibold text-left">
                NO DE OFICIO
              </th>
              <th className="py-2 px-4 font-semibold text-left">REMITENTE</th>
              <th className="py-2 px-4 font-semibold text-left">
                DESTINATARIO
              </th>
              <th className="py-2 px-4 font-semibold text-left">ESTATUS</th>
            </tr>
          </thead>
          <tbody>
            {props.rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              props.rows.map((row, index) => (
                <tr key={index} className="border-t ">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => props.handleOpenModal("edit")}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => props.handleOpenModal("view")}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => props.handleOpenModal("list")}
                        className="text-gray-600 hover:text-primary-900"
                      >
                        <FiList />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">{row.folio}</td>
                  <td className="py-2 px-4">
                    {new Date(row.fecha).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{row.remDepen}</td>
                  <td className="py-2 px-4">{row.tipo}</td>
                  <td className="py-2 px-4">{row.noOficio}</td>
                  <td className="py-2 px-4">{row.remNombre}</td>
                  <td className="py-2 px-4">{row.destNombre}</td>
                  <td className="py-2 px-4">{row.estatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
