'use client';
import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="d-flex">
      <div className="input-group">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="form-control rounded-lg border px-4 py-2 text-sm"
        />
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>


  );
}
