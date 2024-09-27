import styles from './RatingCard.module.css';

function RatingCard({ rating }: { rating: number }) {
  return (
    <div className={styles.rating}>
      {rating}
      <img src='/star-icon.svg' alt='Иконка звезды' />
    </div>
  );
}

export default RatingCard;
