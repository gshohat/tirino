import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { EventEmitter } from "./event-emitter.ts";

type Events = {
  like: [string];
};

Deno.test("on", () => {
  const eventEmitter = new EventEmitter<Events>();

  eventEmitter.on("like", (payload: string) => {
    assertEquals(payload, "hello");
  });

  eventEmitter.emit("like", "hello");
});
