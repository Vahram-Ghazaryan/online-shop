import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

export default function ProductModal({ product, sellers, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    sellerId: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || '',
        stock: product.stock || '',
        sellerId: product.sellerId || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock) || 0,
      sellerId: form.sellerId ? parseInt(form.sellerId) : null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {product ? 'Խմբագրել ապրանքը' : 'Ավելացնել ապրանք'}
          </h2>
          <button className="modal-close" onClick={onClose}><HiX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">{'Անվանում'}</label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={'Ապրանքի անվանումը'}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Նկարագրություն'}</label>
              <textarea
                className="form-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder={'Ապրանքի նկարագրությունը'}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Գին'} (֎)</label>
              <input
                className="form-input"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Նկարի հասցե'} (URL)</label>
              <input
                className="form-input"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Կատեգորիա'}</label>
              <input
                className="form-input"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder={'Կատեգորիան'}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Պահեստ'}</label>
              <input
                className="form-input"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{'Վաճառող'}</label>
              <select
                className="form-select"
                name="sellerId"
                value={form.sellerId}
                onChange={handleChange}
              >
                <option value="">{'Ընտրեք վաճառողին'}</option>
                {(sellers || []).map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {'Չեղարկել'}
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Պահպանել' : 'Ստեղծել'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
