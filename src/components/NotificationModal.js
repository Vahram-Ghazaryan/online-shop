import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

export default function NotificationModal({ notification, onSave, onClose }) {
  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    sellerName: '',
    quantity: 1,
    totalAmount: '',
    status: 'pending',
    read: false,
  });

  useEffect(() => {
    if (notification) {
      setForm({
        productName: notification.productName || '',
        productPrice: notification.productPrice || '',
        sellerName: notification.sellerName || '',
        quantity: notification.quantity || 1,
        totalAmount: notification.totalAmount || '',
        status: notification.status || 'pending',
        read: notification.read || false,
      });
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      productPrice: parseFloat(form.productPrice),
      quantity: parseInt(form.quantity),
      totalAmount: parseFloat(form.totalAmount),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {notification ? 'Խմբագրել ծանուցումը' : 'Ավելացնել ծանուցում'}
          </h2>
          <button className="modal-close" onClick={onClose}><HiX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">{'Ապրանքի անվանումը'}</label>
              <input
                className="form-input"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Ապրանքի գինը'} (֎)</label>
              <input
                className="form-input"
                name="productPrice"
                type="number"
                step="0.01"
                value={form.productPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Վաճառողի անունը'}</label>
              <input
                className="form-input"
                name="sellerName"
                value={form.sellerName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Քանակ'}</label>
              <input
                className="form-input"
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Ընդհանուր գումարը'} (֎)</label>
              <input
                className="form-input"
                name="totalAmount"
                type="number"
                step="0.01"
                value={form.totalAmount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Կարգավիճակ'}</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">{'Սպասվում է'}</option>
                <option value="shipped">{'Առաքված է'}</option>
                <option value="delivered">{'Հաստատված է'}</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                name="read"
                checked={form.read}
                onChange={handleChange}
                id="readCheck"
                style={{ width: '18px', height: '18px', accentColor: '#F59E0B' }}
              />
              <label htmlFor="readCheck" className="form-label" style={{ marginBottom: 0 }}>
                {'Կարդացված է'}
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {'Չեղարկել'}
            </button>
            <button type="submit" className="btn btn-primary">
              {notification ? 'Պահպանել' : 'Ստեղծել'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
