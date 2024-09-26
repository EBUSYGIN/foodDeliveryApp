import { FormEvent, InputHTMLAttributes } from 'react';

export interface PromoProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  sendPromo: (e: FormEvent) => void;
}
