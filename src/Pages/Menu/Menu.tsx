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
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      setFilter(value);
      console.log(value);
    }
  };

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            name
          }
        }
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
        <Search
          placeholder='Введите блюдо или состав'
          onKeyUp={searchHandler}
        />
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
