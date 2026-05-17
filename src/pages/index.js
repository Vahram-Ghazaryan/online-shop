import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { HiShoppingBag, HiUsers, HiBell, HiArrowRight, HiStar } from 'react-icons/hi';

export default function Home() {
  const [stats, setStats] = useState({ products: 0, sellers: 0, notifications: 0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()).catch(() => []),
      fetch('/api/sellers').then(r => r.json()).catch(() => []),
      fetch('/api/notifications').then(r => r.json()).catch(() => []),
    ]).then(([products, sellers, notifications]) => {
      const p = Array.isArray(products) ? products : [];
      const s = Array.isArray(sellers) ? sellers : [];
      const n = Array.isArray(notifications) ? notifications : [];
      setStats({ products: p.length, sellers: s.length, notifications: n.length });
      setRecentProducts(p.slice(0, 4));
      setLoading(false);
    });
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString('hy-AM') + ' ֎';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>GoldMarket - Գլխավոր</title>
      </Head>

      <div className="hero">
        <h1>GoldMarket</h1>
        <p>{'Բարի գալուստ օնլայն խանութը՝ որտեղ դուք կգտնեք ամենալավ ապրանքները'}</p>
        <div className="hero-actions">
          <Link href="/products" className="btn btn-primary">
            <HiShoppingBag /> {'Ապրանքներ'}
          </Link>
          <Link href="/sellers" className="btn btn-secondary">
            <HiUsers /> {'Վաճառողներ'}
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <HiShoppingBag />
          </div>
          <div className="stat-value">{stats.products}</div>
          <div className="stat-label">{'Ապրանքներ'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
            <HiUsers />
          </div>
          <div className="stat-value">{stats.sellers}</div>
          <div className="stat-label">{'Վաճառողներ'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>
            <HiBell />
          </div>
          <div className="stat-value">{stats.notifications}</div>
          <div className="stat-label">{'Գնումներ'}</div>
        </div>
      </div>

      {recentProducts.length > 0 && (
        <>
          <div className="page-header">
            <div>
              <h2 className="page-title">{'Վերջին ապրանքները'}</h2>
              <p className="page-subtitle">{'Նոր ավելացված ապրանքներ'}</p>
            </div>
            <Link href="/products" className="btn btn-secondary btn-sm">
              {'Տեսնել բոլորը'} <HiArrowRight />
            </Link>
          </div>
          <div className="card-grid">
            {recentProducts.map(product => (
              <div key={product.id} className="card">
                {product.image && (
                  <img src={product.image} alt={product.name} className="card-image" />
                )}
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-text">{product.description}</p>
                  <div className="card-price">{formatPrice(product.price)}</div>
                  <div className="card-meta">
                    {product.category && (
                      <span className="card-tag">{product.category}</span>
                    )}
                    {product.seller && (
                      <span className="card-tag">
                        <HiStar /> {product.seller.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
