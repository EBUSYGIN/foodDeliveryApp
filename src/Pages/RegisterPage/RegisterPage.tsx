import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from '../LoginPage/LoginPage.module.css';
import { useForm } from 'react-hook-form';
import { RegisterForm } from '../../interfaces/RegisterForm.interface';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/user.slice';
import { AppDispatch, RootState } from '../../Redux/store';
import { useEffect } from 'react';
import { validateEmail } from '../../utils/validateEmail';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    reValidateMode: 'onSubmit'
  });
  const dispatch = useDispatch<AppDispatch>();
  const { registerState, jwt } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt]);

  const submit = (data: RegisterForm) => {
    dispatch(registerUser(data));
  };

  return (
    <div>
      <Heading>Регистрация</Heading>
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
        <label className={styles.label}>
          Ваше имя
          <Input
            placeholder='Ваше имя'
            {...register('name', {
              required: 'Поле обязательно к заполнению'
            })}
          />
        </label>
        <div className={styles.errors}>
          {errors.email
            ? errors.email.message
            : errors.password
            ? errors.password.message
            : errors.name
            ? errors.name.message
            : registerState
            ? registerState
            : ''}
        </div>
        <Button className={styles.button} appereance='big'>
          Вход
        </Button>
      </form>
      <div className={styles.register}>
        <div>Есть аккаунт?</div>
        <Link className={styles.link} to={'/auth/login'}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
