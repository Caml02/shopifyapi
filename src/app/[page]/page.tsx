import type { Metadata } from 'next';
import React from 'react';
import Prose from '../../components/prose';
import { getPage } from '../../lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

interface PageProps {
  params: { page: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <div>
      <h1 className="mb-5 text-lg fw-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </div>
  );
};

export default Page;
