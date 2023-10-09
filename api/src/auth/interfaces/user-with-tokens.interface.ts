import { Token, User } from "@prisma/client"

export interface ITokens {
  accessToken: string,
  refreshToken: Token;
}
export interface IUserWithTokens {
  user: User
  tokens: ITokens
}