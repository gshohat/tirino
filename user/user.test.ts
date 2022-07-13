import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { EventEmitter } from "../event-emitter/event-emitter.ts";
import { createManUser } from "./factory/factory.ts";

type Events = {
  like: [string];
};

const eventEmitter = new EventEmitter<Events>();

Deno.test("max 8 likes a day", () => {
  const man = createManUser("Romeo", eventEmitter);

  const womanName = "Juliet";

  for (let i = 1; i < 9; i++) {
    const res = man.like(womanName);
    assertEquals(res, true);
  }
  const res = man.like(womanName);
  assertEquals(res, false);
});
