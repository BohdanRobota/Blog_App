import { User } from "@prisma/client"
import { Exclude } from "class-transformer"

export class UserResponse implements User {
  id: string
  email: string
  name: string
  avatar: string
  @Exclude()
  password: string
  createdAt: Date
  @Exclude()
  updatedAt: Date

  constructor(user: User) {
    Object.assign(this, user);
  }
}