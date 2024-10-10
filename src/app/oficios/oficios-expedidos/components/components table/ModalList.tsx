"use client";

import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalList = (props: Props) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full relative">
        {/* Título y botón de cerrar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">OFICIO RECIBIDO - Bitacora</h1>
          <button onClick={props.onClose} className="text-gray-500"></button>
        </div>

        {/* Folio y Selección de CEA/SEPROA */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Folio
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">
              CEA
            </label>
            <input type="radio" name="selection" />
            <label className="block text-sm font-medium text-gray-700">
              SEPROA
            </label>
            <input type="radio" name="selection" />
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
        </div>

        {/* Número de Oficio, Fechas (Documento y Límite) */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Número de Oficio
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Fecha del Documento
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Fecha Límite
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
        </div>

        {/* Remitente y Destinatario */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Remitente
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Destinatario
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
        </div>

        {/* Tema y Bitácora */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tema
            </label>
            <input
              type="text"
              placeholder=""
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-4/5">
              <label className="block text-sm font-medium text-gray-700">
                Bitacora
              </label>
              <input
                type="text"
                placeholder=""
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              />
            </div>
            <div className="w-1/5 flex items-end">
              <button className="text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded w-full">
                Ingresar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Bitácora */}
        <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Fecha</th>
              <th className="border border-gray-300 px-2 py-1">Usuario</th>
              <th className="border border-gray-300 px-2 py-1">Estatus</th>
              <th className="border border-gray-300 px-2 py-1">Comentarios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Botón de cancelar */}
        <div className="flex justify-end mt-4">
          <button
            onClick={props.onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalList;
