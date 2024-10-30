import Nav from '@/components/layout/nav';
import './globals.css';
import Footer from '@/components/layout/footer';
import { Toaster } from 'react-hot-toast';
import { Providers } from './lib/redux/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          <main className="p-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
