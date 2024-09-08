import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import { SubmitHandler, useForm } from 'react-hook-form';

import { requestAccessToken } from '../../helpers/requestToken';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { userActions } from '../../Redux/user.slice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ mode: 'onBlur' });

  const submit: SubmitHandler<LoginForm> = async (data) => {
    const token = await requestAccessToken(data);
    if (token instanceof AxiosError) {
      console.log(token.response?.data.message);
      return;
    }
    dispatch(userActions.addJwt({ jwt: token }));
    navigate('/');
  };

  const validateEmail = (data: string) => {
    if (data.includes('@')) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = (data: string) => {
    if (data.length > 1) {
      return true;
    } else {
      return 'Пароль должен быть длиннее одного символа';
    }
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
          <div>{errors?.email?.message ? `${errors.email.message}` : ' '}</div>
        </label>
        <label className={styles.label}>
          Ваш пароль
          <Input
            placeholder='Пароль'
            {...register('password', {
              required: true,
              validate: validatePassword
            })}
          />
          <div>
            {errors?.password?.message ? `${errors.password.message}` : ' '}
          </div>
        </label>
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
