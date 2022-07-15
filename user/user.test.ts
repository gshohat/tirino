import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { createManUser, manUserDetails } from "./factory/factory.ts";
import { calculateAge } from "./user.ts";

type Events = {
  like: [string];
};

const eventEmitter = new EventEmitter<Events>();

Deno.test("max 8 likes a day", () => {
  const man = createManUser(
    "Romeo",
    manUserDetails.birthdate as Date,
    eventEmitter,
  );

  const womanName = "Juliet";

  for (let i = 1; i < 9; i++) {
    const res = man.like(womanName);
    assertEquals(res, true);
  }
  const res = man.like(womanName);
  assertEquals(res, false);
});

Deno.test("date 1.1.1990 should be 32 years age", () => {
  const birthdate = new Date(1990, 0, 1);
  const age = calculateAge(birthdate);
  assertEquals(age, 32);
});
