import { Gender, User } from "../user.ts";
import { EventEmitter } from "../../event-emitter/event-emitter.ts";
import { ILocation, IUserDetails } from "../user.d.ts";

type Events = {
  like: [string];
};

const viennaLocation: ILocation = {
  Latitude: 48.210033,
  Longitude: 16.363449,
};

export const createManUser = (
  name: string,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({
    ...{ name, email: `${name}@gmail.com` },
    ...manUserDetails,
  }, eventEmitter);
};

export const manUserDetails: IUserDetails = {
  gender: Gender.Male,
  birthdate: new Date(1990, 1, 1),
  location: viennaLocation,
  preferences: {
    ageRange: {
      min: 25,
      max: 30,
    },
  },
};

export const createWomanUser = (
  name: string,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({
    ...{ name, email: `${name}@gmail.com` },
    ...womanUserDetails,
  }, eventEmitter);
};

export const womanUserDetails: IUserDetails = {
  gender: Gender.Female,
  birthdate: new Date(1990, 1, 1),
  location: viennaLocation,
  preferences: {
    ageRange: {
      min: 25,
      max: 30,
    },
  },
};
