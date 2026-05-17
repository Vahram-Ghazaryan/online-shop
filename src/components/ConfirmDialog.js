import { HiExclamation } from 'react-icons/hi';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <div className="modal-body">
          <div className="confirm-dialog">
            <div className="confirm-dialog-icon">
              <HiExclamation />
            </div>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={onCancel}>
                {'Չեղարկել'}
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                {'Ջնջել'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
