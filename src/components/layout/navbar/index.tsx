import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import LogoSquare from '@/components/logo-square';
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
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
      <div className="navbar-toggler md-none">
        <MobileMenu menu={menu} />
      </div>
      <div className="container-fluid">
        <div className="d-flex w-full md:w-1/3">
          <Link href="/" className="navbar-brand">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
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
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
