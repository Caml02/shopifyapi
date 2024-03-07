import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { Product } from '@/lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="d-flex flex-column border-bottom pb-4">
        <h1 className="text-black fw-bold">{product.title}</h1>
        <div className="text-white">
          <Price
            className='bg-primary m-2'
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="m-5 fw-semibold h4"
          html={product.descriptionHtml}
        />
      ) : null}

      <div className='btn-block'>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />      
      </div>
    </>
  );
}
