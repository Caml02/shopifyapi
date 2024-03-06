import { GridTileImage } from '@/components/grid/tile';
import { getCollectionProducts } from '@/lib/shopify';
import type { Product } from '@/lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div className="card border-0">
      <Link className="d-block text-center" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={250}
          height={150}
          priority={priority}
          alt={item.title}
          label={{
            position: 'center',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'FXR'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2] || !homepageItems[3]) return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] = homepageItems;

  return (
    <section className="mx-auto container d-flex flex-wrap row">
      <div className='col-md-3'>
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      </div>
      <div className='col-md-3'>      
        <ThreeItemGridItem size="full" item={secondProduct} priority={true} />
      </div>
      <div className='col-md-3'>
        <ThreeItemGridItem size="full" item={thirdProduct} />
      </div>
      <div className='col-md-3'>
        <ThreeItemGridItem size="full" item={fourthProduct} />
      </div>
    </section>
  );
}
