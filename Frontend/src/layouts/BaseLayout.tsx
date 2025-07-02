import type {ReactNode}  from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

type BaseLayoutProps = {
  children: ReactNode;
};

function BaseLayout({children}:BaseLayoutProps) {
  return (
    <>
        <Header />
      
        <main >
            {children}
        </main>
      
      <Footer />
    </>
      
    
  )
}

export default BaseLayout
