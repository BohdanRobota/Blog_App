import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BlogPage from "../pages/BlogPage";
import PostItem from "../pages/PostItemPage";
import ProfilePage from "../pages/UserProfilePage";
import CreatePost from "../pages/CreatePost";
import MyProfilePage from "../pages/MyProfilePage";

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouterNames {
  ROOT = '/',
  BLOG = '/blog',
  OPEN_POST = '/post/',
  POST_ITEM = "/post/:id",
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  CREATE_POST = '/create-post',
  MY_PROFILE = '/my_profile'
}

export const publicRoutes: IRoute[] = [
  { path: RouterNames.LOGIN, component: LoginPage },
  { path: RouterNames.REGISTER, component: RegisterPage },
  { path: RouterNames.ROOT, component: LoginPage },
]

export const privateRoutes: IRoute[] = [
  { path: RouterNames.BLOG, component: BlogPage },
  { path: RouterNames.POST_ITEM, component: PostItem },
  { path: RouterNames.PROFILE, component: ProfilePage },
  { path: RouterNames.CREATE_POST, component: CreatePost },
  { path: RouterNames.MY_PROFILE, component: MyProfilePage },
]