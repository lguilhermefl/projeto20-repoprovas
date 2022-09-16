import { Users } from "@prisma/client";

export type User = Users;
export type UserInsertData = Omit<User, "id">;
export interface UserBodyData extends UserInsertData {
  repeat_password: string;
}
