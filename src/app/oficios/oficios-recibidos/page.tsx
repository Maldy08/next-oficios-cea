"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function OficiosRecibidosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [isInternal, setIsInternal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Oficios Recibidos</h1>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        Abrir Formulario
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Ingresar Oficio Recibido</h2>

            <form className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">
                    Folio
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="5554545"
                    disabled
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    CEA
                  </label>
                  <input
                    type="radio"
                    className="form-radio text-red-600 focus:border-red-600 focus:ring-red-600"
                    name="option"
                    defaultChecked
                  />
                  <label className="text-sm font-medium text-gray-700">
                    SEPROA
                  </label>
                  <input
                    type="radio"
                    className="form-radio text-red-600 focus:border-red-600 focus:ring-red-600"
                    name="option"
                  />
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="2024-07-15"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Oficio
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha Captura
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="2024-07-15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="2024-07-15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Sección Externo */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isExternal}
                      onChange={setIsExternal}
                      className={`${
                        isExternal ? "bg-red-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span
                        className={`${
                          isExternal ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <label className="text-sm font-medium text-gray-700">
                      Externo?
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre del Remitente
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Sección Interno */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isInternal}
                      onChange={setIsInternal}
                      className={`${
                        isInternal ? "bg-red-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span
                        className={`${
                          isInternal ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <label className="text-sm font-medium text-gray-700">
                      Interno?
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre del Destinatario
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre del Responsable
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tema
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Archivos
                </label>
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
