"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface ModalListProps {
  isOpen: boolean;
  onClose: () => void;
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ModalList: React.FC<ModalListProps> = ({ isOpen, onClose }) => {
  const todayDate = getCurrentDate();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/datos");
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <h1 className="text-xl font-bold mb-4">Detalles del Oficio</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Folio
            </label>
            <div className="mt-1">
              <input
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label>CEA</label>
              <input type="radio" name="selection" className="mr-4" />
              <label>SEPRA</label>
              <input type="radio" name="selection" />
            </div>

            <div className="mt-4 my-4">
              <label className="font-bold">Fecha: </label>
              <span>{todayDate}</span>
            </div>
          </div>

          <div>
            <label>Número de Oficio</label>
            <input
              type="text"
              className="block w-full appearance-none rounded-md border px-2 focus:outline-none"
            />
            <label>
              Fecha de Oficio
              <input
                className="px-3"
                type="date"
                name="party"
                min="2000-00-00"
                max="3000-00-00"
              />
            </label>
            <label>
              Fecha de límite
              <input
                className="px-3"
                type="date"
                name="party"
                min="2000-00-00"
                max="3000-00-00"
              />
            </label>
          </div>

          <label>Remitente</label>
          <input
            type="text"
            className="appearance-none rounded-md border px-2 focus:outline-none"
          />

          <label>Destinatario</label>
          <input
            type="text"
            className="appearance-none rounded-md border px-2 focus:outline-none"
          />

          <div className="space-x-4">
            <label>Tema de Oficio</label>
            <input
              type="text"
              className="appearance-none rounded-md border px-2 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label>Captura bitacora</label>
            <input
              type="text"
              className="appearance-none rounded-md border px-2 focus:outline-none"
            />

            <button className="text-white bg-primary-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all">
              Ingresar
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Estatus</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>datos</td>
                <td>datos</td>
                <td>datos</td>
                <td>datos</td>
                {/* {datos.map((datos) => (
                  <tr key={6}>
                    <td>datos</td>
                    <td>datos</td>
                    <td>datos</td>
                    <td>datos</td>
                  </tr>
                ))} */}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={onClose}
            className="p-2 text-white bg-primary-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalList;
