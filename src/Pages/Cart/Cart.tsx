import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../Redux/store';

export function Cart() {
  const products = useSelector((s: RootState) => s.cart.products);
  console.log(products);

  return (
    <div>
      <Heading>Корзина</Heading>
    </div>
  );
}
