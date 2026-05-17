import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiShoppingBag, HiUsers, HiBell, HiHome, HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUnreadCount(data.filter(n => !n.read).length);
        }
      })
      .catch(() => { });
  }, [router.pathname]);

  const links = [
    { href: '/', label: 'Գլխավոր', icon: <HiHome /> },
    { href: '/products', label: 'Ապրանքներ', icon: <HiShoppingBag /> },
    { href: '/sellers', label: 'Վաճառողներ', icon: <HiUsers /> },
    { href: '/notifications', label: 'Ծանուցումներ', icon: <HiBell /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          GoldMarket
        </Link>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${router.pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              {link.label}
              {link.badge > 0 && (
                <span className="notification-badge">{link.badge}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
