import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

export default function SellerModal({ seller, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (seller) {
      setForm({
        name: seller.name || '',
        email: seller.email || '',
        phone: seller.phone || '',
        address: seller.address || '',
      });
    }
  }, [seller]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {seller ? 'Խմբագրել վաճառողին' : 'Ավելացնել վաճառող'}
          </h2>
          <button className="modal-close" onClick={onClose}><HiX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">{'Անուն ազգանուն'}</label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={'Վաճառողի անունը'}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Էլ. հասցե'}</label>
              <input
                className="form-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Հեռախոս'}</label>
              <input
                className="form-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+374 XX XXXXXX"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Հասցե'}</label>
              <textarea
                className="form-textarea"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder={'Վաճառողի հասցեն'}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {'Չեղարկել'}
            </button>
            <button type="submit" className="btn btn-primary">
              {seller ? 'Պահպանել' : 'Ստեղծել'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
