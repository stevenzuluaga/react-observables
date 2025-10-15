import { useEffect, useState, type FormEvent } from "react";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  of,
  shareReplay,
  switchMap,
} from "rxjs";
import type { Character } from "../../core/domain/character.entity";
import { getCharacters } from "../../services/rick-and-morty.service";
import { EmptyPageState, type PageState } from "../interfaces";

const inputChange$ = new BehaviorSubject("rick");
const page$ = new BehaviorSubject(1);

export function useCharacterSearch() {
  const [pageState, setPageState] =
    useState<PageState<Character>>(EmptyPageState);
  const [pagination, setPagination] = useState({ current: 1, total: 0 });

  const searchCharacters = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    inputChange$.next(target.value);
    page$.next(1); // resetear a página 1 al cambiar búsqueda
  };

  const goToPage = (page: number) => page$.next(page);

  const nextPage = () =>
    setPagination((p) => {
      const next = Math.min(p.current + 1, p.total);
      page$.next(next);
      return { ...p, current: next };
    });

  const prevPage = () =>
    setPagination((p) => {
      const prev = Math.max(p.current - 1, 1);
      page$.next(prev);
      return { ...p, current: prev };
    });

  useEffect(() => {
    const search$ = inputChange$.pipe(
      debounceTime(500),
      filter((term) => term.length > 3)
    );

    const subscription = combineLatest([search$, page$])
      .pipe(
        distinctUntilChanged(
          ([prevTerm, prevPage], [currTerm, currPage]) =>
            prevTerm === currTerm && prevPage === currPage
        ),
        switchMap(([value, page]) => {
          setPageState({ data: [], error: null, isLoading: true });

          return from(getCharacters(value, page)).pipe(
            map((result) => ({
              data: result.results,
              error: null,
              totalPages: result?.info?.pages ?? 0,
              currentPage: page,
            })),
            catchError((err) =>
              of({
                data: [],
                error: err instanceof Error ? err.message : String(err),
                totalPages: 0,
                currentPage: 1,
              })
            )
          );
        }),
        shareReplay(1)
      )
      .subscribe(({ data, error, totalPages, currentPage }) => {
        setPageState({ data, error, isLoading: false });
        setPagination({ total: totalPages, current: currentPage });
      });

    return () => subscription.unsubscribe();
  }, []);

  return {
    ...pageState,
    searchCharacters,
    totalPages: pagination.total,
    currentPage: pagination.current,
    goToPage,
    nextPage,
    prevPage,
  };
}
