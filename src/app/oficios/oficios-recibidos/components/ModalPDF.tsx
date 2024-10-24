import React from 'react';

interface ModalProps {
  url: string; // URL del PDF
  onClose: () => void; // Función para cerrar el modal
}

const Modal = ({ url, onClose }: ModalProps) => {
  if (!url) return null; // Si no hay URL, no se muestra el modal

  // Agregamos zoom a la URL del PDF
  const pdfUrlWithZoom = `${url}#zoom=75`; // Ajusta el valor de zoom (en porcentaje) a tu gusto

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000 // Asegúrate de que el modal esté por encima de otros elementos
    }}>
      <div className="modal-content" style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '80%',
        maxWidth: '800px',
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0 }}>Visualizar PDF</h2>
          <button onClick={onClose} style={{
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            ✕ {/* Estilizado con una "X" en texto */}
          </button>
        </div>
        <div className="modal-body" style={{ margin: '20px 0' }}>
          <iframe src={pdfUrlWithZoom} width="100%" height="500px" style={{ border: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
