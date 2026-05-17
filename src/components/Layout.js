import Head from 'next/head';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>GoldMarket - Օնլայն Խանութ</title>
      </Head>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#1E293B',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: { primary: '#F59E0B', secondary: '#FFF' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#FFF' },
          },
        }}
      />
      <Navbar />
      <main className="container">
        {children}
      </main>
    </>
  );
}
