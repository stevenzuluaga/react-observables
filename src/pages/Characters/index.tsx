import { Card } from "../../components/Card";
import type { Character } from "../../core/domain/character.entity";
import { useCharacterSearch } from "./useCharacters";

export function Characters() {
  const { data, error, isLoading, searchCharacters } = useCharacterSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="...SearchComponent"
        onChange={searchCharacters}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error &&
        !isLoading &&
        data.map((character: Character) => (
          <Card key={character.id} character={character} />
        ))}
    </div>
  );
}
