import React from "react";

interface ModalConfirmacionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ModalConfirmacion = (props: ModalConfirmacionProps) => {
  const { isOpen, onClose, onConfirm, message } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold">Confirmación</h2>
        <p>{message}</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-[#641c34] text-white py-2 px-4 rounded hover:bg-primary-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
