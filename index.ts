import { PlayGround } from "./index.d.ts";

export enum Gender {
  Male,
  Female,
}

export function createPlayGround(): PlayGround {
  const playGround: PlayGround = {
    men: [],
    women: [],
  };

  for (let i = 0; i < 10; i++) {
    playGround.men.push({
      username: `man${i}`,
      gender: Gender.Male,
      score: 0,
    });
    playGround.women.push({
      username: `woman${i}`,
      gender: Gender.Female,
      score: 0,
    });
  }
  return playGround;
}
