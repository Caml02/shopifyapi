import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from '@/components/grid/tile';
import Footer from '@/components/layout/footer';
import { Gallery } from '@/components/product/gallery';
import { ProductDescription } from '@/components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { getProduct, getProductRecommendations } from '@/lib/shopify';
import { Image } from '@/lib/shopify/types';
import Link from 'next/link';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
        <div id='Product-Description' className="mx-auto container px-4 row text-center justify-content-center align-content-center">
          <div className="d-flex rounded-lg rounded-5 bg-light">
            <div className="pt-5 col-md-9">
              <Gallery
              images={product.images.map((image: Image) => ({
                src: image.url,
                altText: image.altText
              }))}
            />    
            </div>

          <div className="col-md-3">
            <ProductDescription product={product} />
          </div>
        </div>
        <div className='col-12'>
          <Suspense>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
<div className="py-4">
  <h2 className="mb-4 fw-bold">Related Products</h2>
  <ul className="row pt-1 list-unstyled">
    {relatedProducts.map((product) => (
      <li key={product.handle} className="col-3">
        <Link className="d-block position-relative h-100" href={`/product/${product.handle}`}>
          <GridTileImage
            className='card-img-top'
            alt={product.title}
            label={{
              title: product.title,
              amount: product.priceRange.maxVariantPrice.amount,
              currencyCode: product.priceRange.maxVariantPrice.currencyCode,
            }}
            src={product.featuredImage?.url}
            width={150}
            height={250}
            sizes="(min-width: 1200px) 20vw, (min-width: 992px) 25vw, (min-width: 768px) 33vw, (min-width: 576px) 50vw, 100vw"
          />
        </Link>
      </li>
    ))}
  </ul>
</div>

  );
}
