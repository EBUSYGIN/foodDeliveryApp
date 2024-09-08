import axios from 'axios';
import { LoginForm } from '../interfaces/LoginForm.interface';

export const requestAccessToken = async (data: LoginForm) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data
    );
    return res.data.access_token;
  } catch (e) {
    return e;
  }
};
