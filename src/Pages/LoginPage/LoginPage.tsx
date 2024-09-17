import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { login } from '../../Redux/user.slice';
import { useEffect } from 'react';
import { validateEmail } from '../../utils/validateEmail';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loginState, jwt } = useSelector((s: RootState) => s.user);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ reValidateMode: 'onSubmit' });

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt, navigate]);

  const submit: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data));
  };

  return (
    <div>
      <Heading>Вход</Heading>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <label className={styles.label}>
          Ваш email
          <Input
            placeholder='Email'
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              validate: validateEmail
            })}
          />
        </label>
        <label className={styles.label}>
          Ваш пароль
          <Input
            placeholder='Пароль'
            {...register('password', {
              required: 'Поле обязательно к заполнению'
            })}
          />
        </label>
        <div className={styles.errors}>
          {errors.email
            ? errors.email.message
            : errors.password
            ? errors.password.message
            : loginState
            ? loginState
            : ''}
        </div>
        <Button className={styles.button} appereance='big'>
          Вход
        </Button>
      </form>
      <div className={styles.register}>
        <div>Нет аккаунта?</div>
        <Link className={styles.link} to={'/auth/register'}>
          Зарегестрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
