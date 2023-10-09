import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/AuthResponse";
import { AUTH_ROUTES } from "../enum";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(AUTH_ROUTES.LOG_IN, { email, password });
  }
  static async register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(AUTH_ROUTES.REGISTER, { email, password });
  }
  static async logout(): Promise<void> {
    $api.get<AuthResponse>(AUTH_ROUTES.LOG_OUT);
  }
}