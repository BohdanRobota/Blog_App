import * as yup from 'yup';
import { validatePassword } from './password.schema';

export const registerSchema = yup.object().shape({
  email: yup.string().email(),
  pass: validatePassword(),
  confirm: yup
    .string()
    .oneOf([yup.ref('pass')], 'Passwords must match'),
});
