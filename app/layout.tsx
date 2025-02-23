import Sidebar from '@/components/Sidebar';
import '@/styles/global.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="id">
      <body className="flex min-h-screen">
        {children}
      </body>
    </html>
  );
}
