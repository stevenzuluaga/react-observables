import type { Pagination } from "./common/pagination";

/**
 * Location reference interface
 */
export interface Location {
  name: string;
  url: string;
}

/**
 * Character status type
 */
export type CharacterStatus = "Alive" | "Dead" | "unknown";

/**
 * Character gender type
 */
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

/**
 * Character interface based on Rick and Morty API
 */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * API Response wrapper for paginated character list
 */
export type CharacterPagination = Pagination<Character>;
