import { type Character } from "../../core/domain/character.entity";
import { useCharacterSearch } from "../../pages/Characters/useCharacters";
import { Loading } from "../Loading";
import { Pagination } from "../Pagination";
import TableHeader from "./TableHeader";
import { TableItem } from "./TableItem";
import { TableItemHeader } from "./TableItemHeader";

export function Table() {
  const {
    data: characters,
    error,
    isLoading,
    searchCharacters,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = useCharacterSearch();

  return (
    <div>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <TableHeader searchCharacters={searchCharacters} />

        {error && <div>{error}</div>}
        {isLoading && <Loading />}

        {!isLoading && !error && characters && (
          <div className="p-6 px-0 overflow-scroll">
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  {["Personaje", "Género", "Status", "Actions"].map(
                    (header) => (
                      <TableItemHeader key={header} name={header} />
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {characters?.map((character: Character) => (
                  <TableItem
                    key={character.id}
                    img={character.image}
                    name={character.name}
                    gender={character.gender}
                    species={character.species}
                    status={character.status}
                    type={character.type}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          page={currentPage}
          totalPage={totalPages}
          nextPage={nextPage}
          previousPage={prevPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}
