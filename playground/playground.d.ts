import { User } from "../user/user.ts";

export interface IUsers {
  men: Map<string, User>;
  women: Map<string, User>;
}

export interface IPartner {
  email: string;
  ageYears: number;
}
