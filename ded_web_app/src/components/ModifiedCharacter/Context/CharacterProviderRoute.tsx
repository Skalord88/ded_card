// CharacterProviderRoute.tsx
import { Outlet, useParams } from "react-router-dom";
import { SkillProvider } from "../../Skills/Context/SkillProvider";
import { CharacterProvider } from "./CharacterContext";
import { DataProvider } from "../../Context/Context";

export function CharacterProviderRoute() {
  const { charId } = useParams();

  if (!charId) return null;

  return (
    <DataProvider>
      <CharacterProvider charId={charId}>
        <Outlet />
      </CharacterProvider>
    </DataProvider>
  );
}
export function CharacterListProviderRoute() {
  return (
    <DataProvider>
      <Outlet />
    </DataProvider>
  );
}
