export interface User {
  username: string;
  gender: Gender;
  score: number;
}

export interface PlayGround {
  men: User[];
  women: User[];
}

export declare enum Gender {
  Male = 0,
  Female = 1,
}

export declare function createPlayground(): PlayGround;
