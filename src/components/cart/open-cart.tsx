export default function OpenCart({
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="d-flex text-btn-cart">
      <i className="bi bi-cart3"></i>
      {quantity ? (
        <div className="mx-2">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
