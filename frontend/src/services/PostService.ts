import $api from "../http";
import { AxiosResponse } from 'axios';
import { POST_ROUTES } from "../enum";
import { IPost } from "../models/Post";

export default class PostService {
  static async fetchPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>(POST_ROUTES.MAIN_ROUTE);
  }
  static async getPost(id: string): Promise<AxiosResponse<IPost>> {
    return $api.get<IPost>(`${POST_ROUTES.MAIN_ROUTE}/${id}`);
  }
  static async createPost(data: FormData): Promise<AxiosResponse<IPost>> {
    return $api.post<IPost>(POST_ROUTES.MAIN_ROUTE, data);
  }
}