import { useState, useEffect } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiStar, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import SellerModal from '@/components/SellerModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editSeller, setEditSeller] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSellers = async () => {
    const res = await fetch('/api/sellers').then(r => r.json()).catch(() => []);
    if (Array.isArray(res)) setSellers(res);
    setLoading(false);
  };

  useEffect(() => { fetchSellers(); }, []);

  const handleSave = async (formData) => {
    try {
      const url = editSeller ? `/api/sellers/${editSeller.id}` : '/api/sellers';
      const method = editSeller ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast.success(editSeller ? 'Թարմացվեց' : 'Ստեղծվեց');
      setModalOpen(false);
      fetchSellers();
    } catch { toast.error('Սխալ'); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/sellers/${deleteId}`, { method: 'DELETE' });
      toast.success('Ջնջվեց');
      setDeleteId(null);
      fetchSellers();
    } catch { toast.error('Սխալ'); }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<HiStar key={i} style={{ color: i <= Math.round(rating) ? '#FBBF24' : '#3D2D18', fontSize: '1rem' }} />);
    }
    return stars;
  };

  const filtered = sellers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <>
      <Head><title>{'Վաճառողներ'} - GoldMart</title></Head>
      <div className="page-header">
        <div>
          <h1 className="page-title">{'Վաճառողներ'}</h1>
          <p className="page-subtitle">{'Բոլոր վաճառողների ցանկը'} ({filtered.length})</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditSeller(null); setModalOpen(true); }}>
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
        <div className="empty-state"><h3>{'Վաճառողներ չկան'}</h3></div>
      ) : (
        <div className="card-grid">
          {filtered.map(seller => (
            <div key={seller.id} className="card">
              <div className="card-body">
                <h3 className="card-title">{seller.name}</h3>
                <div className="seller-rating" style={{ marginBottom: '0.75rem' }}>
                  {renderStars(seller.rating)}
                  <span style={{ marginLeft: '4px', fontSize: '0.85rem' }}>{seller.rating}</span>
                </div>
                <div className="card-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HiMail style={{ color: 'var(--gold-500)', flexShrink: 0 }} /> {seller.email}
                </div>
                {seller.phone && (
                  <div className="card-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HiPhone style={{ color: 'var(--gold-500)', flexShrink: 0 }} /> {seller.phone}
                  </div>
                )}
                {seller.address && (
                  <div className="card-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HiLocationMarker style={{ color: 'var(--gold-500)', flexShrink: 0 }} /> {seller.address}
                  </div>
                )}
                <div className="card-actions" style={{ marginTop: '1rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setEditSeller(seller); setModalOpen(true); }}>
                    <HiPencil /> {'Խմբագրել'}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(seller.id)}>
                    <HiTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && <SellerModal seller={editSeller} onSave={handleSave} onClose={() => setModalOpen(false)} />}
      {deleteId && <ConfirmDialog title={'Ջնջել'} message={'Վստահ՞ եք ջնջել՞'} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </>
  );
}
