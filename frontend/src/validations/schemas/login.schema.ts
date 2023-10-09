import * as yup from 'yup';
import { validatePassword } from './password.schema';
export const loginSchema = yup.object().shape({
  email: yup.string().email(),
  pass: validatePassword()
});