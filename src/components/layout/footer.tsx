import Link from 'next/link';
import FooterMenu from '@/components/layout/footer-menu';
import LogoSquare from '@/components/logo-square';
import { getMenu } from '@/lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-100 h-4 bg-light border rounded-3 border-3 animate-pulse border-secondary dark:bg-dark dark:border-dark';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-muted text-small">
      <div className="container-fluid py-4 bg-light border-top border-secondary dark:bg-dark dark:border-dark">
        <div className="row g-4">
          <div className="col-md-4">
            <Link className="d-flex align-items-center mb-3 text-black fw-bold text-decoration-none dark:text-white" href="/">
              <LogoSquare size="sm" />
              <span className="ms-2">{SITE_NAME}</span>
            </Link>
          </div>
          <div className="col-md-4">
            <Suspense
              fallback={
                <div className="row g-2">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>
          <div className="col-md-4 text-md-end">
            <a
              className="btn btn-outline-secondary btn-sm mb-3"
              aria-label="Deploy on Vercel"
              href="https://vercel.com/templates/next.js/nextjs-commerce"
            >
              <span className="me-2">▲</span>
              Deploy
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-4 border-top border-secondary bg-light text-center text-small dark:bg-dark dark:border-dark">
        <p>© {copyrightDate} {copyrightName}. All rights reserved.</p>
        <p className="mb-0">Crafted by ▲ <a href="https://vercel.com" className="text-reset text-decoration-none">Vercel</a></p>
      </div>
    </footer>
  );
}
