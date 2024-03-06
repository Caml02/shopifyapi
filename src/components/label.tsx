import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'center'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  // Clases de posicionamiento con Bootstrap
  const positionClasses = clsx({
    'justify-content-center align-items-center': position === 'center'
  });

  return (
    <div className="card border-0">
      <div className={`card-body text-center ${positionClasses}`}> {/* Posicionamiento para 'center' */}
        <h5 className="card-title">{title}</h5>
        <div className="flex items-center rounded-full">
         <Price
            className="rounded-full p-2 fw-bold h1"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="text-muted mx-2 fs-6 fw-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default Label;
