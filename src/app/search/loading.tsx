import Grid from '@/components/grid';

export default function Loading() {
  return (
    <Grid className="col-md-6 col-lg-4">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item key={index} className="animate-pulse bg-tertiary" data-bs-theme="dark" />
          );
        })}
    </Grid>
  );
}
