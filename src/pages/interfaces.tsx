import type { Character } from "../core/domain/character.entity";

export interface PageState<T> {
  isLoading: boolean;
  error: string | null;
  data: T[];
}

export const EmptyPageState: PageState<Character> = {
  isLoading: false,
  error: null,
  data: [],
};
