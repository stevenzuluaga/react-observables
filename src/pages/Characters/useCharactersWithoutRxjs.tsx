import { useEffect, useRef, useState, type FormEvent } from "react";
import { Card } from "../../components/Card";
import { SearchBar } from "../../components/SearchBar";
import type { Character } from "../../core/domain/character.entity";
import { getCharacters } from "../../services/rick-and-morty.service";

export function Characters() {
  const [query, setQuery] = useState("rick");
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const lastValueRef = useRef<string>(""); // 👉 Para simular distinctUntilChanged
  const debounceTimerRef = useRef<any | null>(null); // 👉 Para debounce

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    // ❌ Si el valor es igual al anterior → no hacer nada (distinctUntilChanged)
    if (query === lastValueRef.current) return;

    // ⏳ Cancelar el debounce anterior si el usuario escribe rápido
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // ⏰ Esperar 500ms antes de disparar la búsqueda
    debounceTimerRef.current = setTimeout(async () => {
      // 🚫 Evitar buscar si la longitud es menor o igual a 3 (filter)
      if (query.length <= 3) return;

      try {
        setIsLoading(true);
        setError(null);
        lastValueRef.current = query;

        const result = await getCharacters(query);
        setData(result.results);
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err instanceof Error ? err.message : String(err));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    // 🧹 Cleanup: cancelar timer cuando el componente se desmonta o cambia query
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  return (
    <div>
      <SearchBar placeholder="...SearchComponent" onChange={onInputChange} />
      {isLoading && <p>⏳ Cargando...</p>}
      {error && <p>❌ {error}</p>}
      {data.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}
