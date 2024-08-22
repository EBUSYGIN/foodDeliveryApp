import { MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
  const onclick = (e: MouseEvent) => {
    console.log(e);
  };
  return (
    <>
      <Button onClick={onclick}>Кнопка</Button>
      <Button appereance={'small'} onClick={onclick}>
        Кнопка
      </Button>
      <Input placeholder='Email' />
    </>
  );
}

export default App;
