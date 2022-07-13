import { Gender, User } from "../user.ts";
import { EventEmitter } from "../../event-emitter/event-emitter.ts";
import { ILocation } from "../user.d.ts";

type Events = {
  like: [string];
};

const viennaLocation: ILocation = {
  Latitude: 48.210033,
  Longitude: 16.363449,
};

export const manUserDetails = {
  gender: Gender.Male,
  email: "contact@giladshohat.com",
  birthdate: new Date(1990, 1, 1),
  location: viennaLocation,
};

export const womanUserDetails = {
  gender: Gender.Female,
  email: "kate@gmail.com",
  birthdate: new Date(1990, 1, 1),
  location: viennaLocation,
};

export const createManUser = (
  name: string,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({ ...{ name }, ...manUserDetails }, eventEmitter);
};

export const createWomanUser = (
  name: string,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({ ...{ name }, ...womanUserDetails }, eventEmitter);
};
