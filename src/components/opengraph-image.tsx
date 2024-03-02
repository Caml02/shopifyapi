import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  return new ImageResponse(
    (
      <div className="d-flex flex-column h-100 w-100 align-items-center justify-content-center bg-dark">
        <div className="d-flex flex-none align-items-center justify-content-center border border-dark h-160 w-160 rounded-3">
          <LogoIcon width="50" height="50" />
        </div>
        <p className="mt-12 text-xl fw-bold text-white">{title}</p>
      </div>

    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(new URL('../fonts/Inter-Bold.ttf', import.meta.url)).then((res) =>
            res.arrayBuffer()
          ),
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
