import { IUser } from "../models/User";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios, { AxiosError } from 'axios';
import { AuthResponse } from "../models/AuthResponse";
import { API_URL } from "../const";
import { AUTH_ROUTES } from "../enum";


export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      this.setAuthSetup(response.data);
    } catch (err) {
      throw err;
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await AuthService.register(email, password);
      this.setAuthSetup(response.data);
    } catch (err) {
      throw err;
    }
  }


  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      throw err;
    }
  }

  async setAuthSetup(data: AuthResponse) {
    localStorage.setItem('token', data.accessToken);
    this.setAuth(true);
    this.setUser(data.user);
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(API_URL + AUTH_ROUTES.REFRESH, { withCredentials: true });
      this.setAuthSetup(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log('err here')
        console.log(err.response);
      }
    } finally {
      this.setLoading(false);
    }
  }
}