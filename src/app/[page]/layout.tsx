import React from 'react';
import Footer from '../../components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="vh-100">
        <div className="py-5 mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
