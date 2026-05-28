import { useState, useEffect } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiShoppingCart, HiSearch, HiStar } from 'react-icons/hi';
import ProductModal from '@/components/ProductModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    const [pRes, sRes] = await Promise.all([
      fetch('/api/products').then(r => r.json()).catch(() => []),
      fetch('/api/sellers').then(r => r.json()).catch(() => []),
    ]);
    if (Array.isArray(pRes)) setProducts(pRes);
    if (Array.isArray(sRes)) setSellers(sRes);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (formData) => {
    try {
      const url = editProduct ? `/api/products/${editProduct.id}` : '/api/products';
      const method = editProduct ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast.success(editProduct ? 'Թարմացվեց' : 'Ստեղծվեց');
      setModalOpen(false);
      fetchData();
    } catch { toast.error('Սխալ'); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      toast.success('Ջնջվեց');
      setDeleteId(null);
      fetchData();
    } catch { toast.error('Սխալ'); }
  };

  const handleBuy = async (p) => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: p.name, productPrice: p.price, sellerName: p.seller?.name || '', quantity: 1, totalAmount: p.price, status: 'pending', purchasedAt: new Date(), read: false }),
      });
      toast.success('Գնումը հաջողվեց');
    } catch { toast.error('Սխալ'); }
  };

  const fmt = (p) => Number(p).toLocaleString('hy-AM') + ' ֎';
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.category||'').toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <>
      <Head><title>{'Ապրանքներ'} - GoldMart</title></Head>
      <div className="page-header">
        <div>
          <h1 className="page-title">{'Ապրանքներ'}</h1>
          <p className="page-subtitle">{'Բոլոր ապրանքների ցանկը'} ({filtered.length})</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditProduct(null); setModalOpen(true); }}>
          <HiPlus /> {'Ավելացնել'}
        </button>
      </div>
      <div className="search-bar">
        <div className="search-input-wrapper">
          <HiSearch />
          <input className="search-input" placeholder={'Որոնել...'} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h3>{'Ապրանքներ չկան'}</h3></div>
      ) : (
        <div className="card-grid">
          {filtered.map(product => (
            <div key={product.id} className="card">
              {product.image && <img src={product.image} alt={product.name} className="card-image" />}
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.description}</p>
                <div className="card-price">{fmt(product.price)}</div>
                <div className="card-meta">
                  {product.category && <span className="card-tag">{product.category}</span>}
                  <span className="card-tag">{'Պահեստ՝'} {product.stock}</span>
                  {product.seller && <span className="card-tag"><HiStar /> {product.seller.name}</span>}
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => handleBuy(product)}><HiShoppingCart /> {'Գնել'}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setEditProduct(product); setModalOpen(true); }}><HiPencil /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(product.id)}><HiTrash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && <ProductModal product={editProduct} sellers={sellers} onSave={handleSave} onClose={() => setModalOpen(false)} />}
      {deleteId && <ConfirmDialog title={'Ջնջել'} message={'Վստահ՞ եք ջնջել՞'} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </>
  );
}
