import { Gender } from "../user/user.ts";
import { PlayGround } from "./playground.ts";
import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import {
  assertSpyCall,
  spy,
} from "https://deno.land/std@0.137.0/testing/mock.ts";

Deno.test("create users playground", () => {
  const playGround = new PlayGround();

  const man0 = playGround.users.men.get("man0@gmail.com");
  const woman0 = playGround.users.women.get("woman0@gmail.com");

  assertEquals(man0!.name, "man0");
  assertEquals(woman0!.name, "woman0");
});

Deno.test("man was liked by a woman", () => {
  const playGround = new PlayGround();

  const emitSpy = spy(playGround.eventEmitter, "emit");

  const manEmail = playGround.users.men.get("man0@gmail.com")!.email;
  const woman0 = playGround.users.women.get("woman0@gmail.com")!;

  woman0!.like(manEmail);
  assertSpyCall(emitSpy, 0, {
    args: ["like", manEmail],
  });
});

Deno.test("reset daily likes counter", () => {
  const playGround = new PlayGround();
  const email = "man0@gmail.com";
  const man0 = playGround.users.men.get(email);
  man0!.dailyLikes = 8;
  const dailyLikesCounter = playGround.resetDailyLikes(email, Gender.Male);
  assertEquals(dailyLikesCounter, 0);
});

Deno.test("create man's pool feed based on age preference", () => {
  const playGround = new PlayGround();
  const man0 = playGround.users.men.get("man0@gmail.com");
  const woman0 = playGround.users.women.get("woman0@gmail.com");
  assertEquals(man0!.pool[0].email, woman0!.email);
});
