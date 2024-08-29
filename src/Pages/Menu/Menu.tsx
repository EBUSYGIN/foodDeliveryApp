import axios, { AxiosError } from 'axios';
import Heading from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import styles from './Menu.module.css';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import ProductList from '../../components/ProductList/ProductList';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(
        `${import.meta.env.VITE_API_URL}/products`
      );
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <Heading>Меню</Heading>
        <Search placeholder='Введите блюдо или состав' />
      </div>
      <div className={styles.menu}>
        {isLoading === false ? (
          <ProductList products={products} />
        ) : (
          <>Загружем продукты</>
        )}
        {error && <>{error}</>}
      </div>
    </div>
  );
}
