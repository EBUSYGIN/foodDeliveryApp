import styles from './IngridientsList.module.css';

function IngridientsList({ ingredients }: { ingredients: string[] }) {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingridient) => (
        <li>{ingridient}</li>
      ))}
    </ul>
  );
}

export default IngridientsList;
