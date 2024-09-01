import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

function ProductPage() {
  const data = useLoaderData() as { data: Product };
  return (
    <Suspense fallback={<>Загрузка</>}>
      <Await resolve={data.data}>
        {({ data }: { data: Product }) => <>Product - {data.name}</>}
      </Await>
    </Suspense>
  );
}

export default ProductPage;
