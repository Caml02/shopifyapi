import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import { getMenu } from '@/lib/shopify';
import { Menu } from '@/lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="navBar navbar navbar-expand-lg">
      <div className="navbar-toggler md-none">
        <MobileMenu menu={menu} />
      </div>
      <div className="container-fluid d-flex row">
        <div className="col-md-4 justify-content-start">
          <Link href="/" className="navbar-brand text-center m-0 ">
              <h2 className='TitleLogo'>{SITE_NAME}</h2>
          </Link>
          {menu.length ? (
            <ul className="text-center">
              {menu.map((item: Menu) => (
                <li className='nav-item' key={item.title}>
                  <Link
                    href={item.path}
                    className="nav-link"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className='col-4'>
          <Search />
        </div>
        <div id="cartHome" className="col-md-4 d-flex justify-content-end btn ">
          <Suspense fallback={<OpenCart />}>
              <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
