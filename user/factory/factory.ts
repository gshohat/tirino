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
  birthdate: Date,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({
    ...{ name, email: `${name}@gmail.com`, birthdate },
    ...manUserDetails,
  }, eventEmitter);
};

export const manUserDetails: IUserDetails = {
  gender: Gender.Male,
  location: viennaLocation,
  preferences: {
    ageRange: {
      min: 25,
      max: 32,
    },
  },
};

export const createWomanUser = (
  name: string,
  birthdate: Date,
  eventEmitter: EventEmitter<Events>,
): User => {
  return new User({
    ...{ name, email: `${name}@gmail.com`, birthdate },
    ...womanUserDetails,
  }, eventEmitter);
};

export const womanUserDetails: IUserDetails = {
  gender: Gender.Female,
  location: viennaLocation,
  preferences: {
    ageRange: {
      min: 25,
      max: 32,
    },
  },
};
