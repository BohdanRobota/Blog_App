import $api from "../http";
import { AxiosResponse } from 'axios';
import { USER_ROUTES } from "../enum";
import { IUser } from "../models/User";
import { UpdateUserDto } from "../dto/update-user.dto";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(USER_ROUTES.FETCH_USERS);
  }
  static async getUser(idOrEmail: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`${USER_ROUTES.FETCH_USERS}/${idOrEmail}`);
  }
  static async updateUserName(dto: UpdateUserDto): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(USER_ROUTES.UPDATE_USER + dto.id, { name: dto.name });
  }
}