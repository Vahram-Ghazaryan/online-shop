import { useState, useEffect } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { HiPencil, HiTrash, HiCheck, HiShoppingCart, HiTruck, HiSearch } from 'react-icons/hi';
import NotificationModal from '@/components/NotificationModal';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editNotif, setEditNotif] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchNotifs = async () => {
    const res = await fetch('/api/notifications').then(r => r.json()).catch(() => []);
    if (Array.isArray(res)) setNotifications(res);
    setLoading(false);
  };

  useEffect(() => { fetchNotifs(); }, []);

  const handleSave = async (formData) => {
    try {
      const url = editNotif ? `/api/notifications/${editNotif.id}` : '/api/notifications';
      const method = editNotif ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast.success(editNotif ? 'Թարմացվեց' : 'Ստեղծվեց');
      setModalOpen(false);
      fetchNotifs();
    } catch { toast.error('Սխալ'); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/notifications/${deleteId}`, { method: 'DELETE' });
      toast.success('Ջնջվեց');
      setDeleteId(null);
      fetchNotifs();
    } catch { toast.error('Սխալ'); }
  };

  const toggleRead = async (n) => {
    try {
      await fetch(`/api/notifications/${n.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !n.read }),
      });
      fetchNotifs();
    } catch {}
  };

  const fmt = (p) => Number(p).toLocaleString('hy-AM') + ' ֎';
  const fmtDate = (d) => new Date(d).toLocaleDateString('hy-AM');

  const statusLabel = { pending: 'Սպասվում է', shipped: 'Առաքված է', delivered: 'Հաստատված է' };
  const statusIcon = { pending: <HiShoppingCart />, shipped: <HiTruck />, delivered: <HiCheck /> };
  const filtered = notifications.filter(n => n.productName.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <>
      <Head><title>{'Ծանուցումներ'} - GoldMart</title></Head>
      <div className="page-header">
        <div>
          <h1 className="page-title">{'Ծանուցումներ'}</h1>
          <p className="page-subtitle">{'Գնումների պատմություն'} ({filtered.length})</p>
        </div>
      </div>
      <div className="search-bar">
        <div className="search-input-wrapper">
          <HiSearch />
          <input className="search-input" placeholder={'Օրոնել...'} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h3>{'Ծանուցումներ չկան'}</h3></div>
      ) : (
        <div className="notification-list">
          {filtered.map(n => (
            <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
              <div className="notification-icon">{statusIcon[n.status]}</div>
              <div className="notification-content">
                <div className="notification-title">{n.productName}</div>
                <div className="notification-desc">
                  {'Վաճառող՝'} {n.sellerName} &middot; {'Քանակ՝'} {n.quantity} &middot; {fmt(n.totalAmount)}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                  <span className={`badge badge-${n.status}`}>{statusLabel[n.status]}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fmtDate(n.purchasedAt)}</span>
                </div>
              </div>
              <div className="notification-actions">
                <button className="btn btn-secondary btn-icon" onClick={() => toggleRead(n)} title={n.read ? 'Նշել որպես չկարդացված' : 'Նշել որպես կարդացված'}>
                  <HiCheck style={{ color: n.read ? 'var(--success)' : 'var(--text-muted)' }} />
                </button>
                <button className="btn btn-secondary btn-icon" onClick={() => { setEditNotif(n); setModalOpen(true); }}>
                  <HiPencil />
                </button>
                <button className="btn btn-danger btn-icon" onClick={() => setDeleteId(n.id)}>
                  <HiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalOpen && <NotificationModal notification={editNotif} onSave={handleSave} onClose={() => setModalOpen(false)} />}
      {deleteId && <ConfirmDialog title={'Ջնջել'} message={'Վստահ՞ եք ջնջել՞'} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </>
  );
}
