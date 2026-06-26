// CharacterProviderRoute.tsx
import { Outlet, useParams } from "react-router-dom";
import { SkillProvider } from "../../Skills/Skills/SkillProvider";
import { CharacterProvider } from "./CharacterContext";

export function CharacterProviderRoute() {
  const { charId } = useParams();

  if (!charId) return null;

  return (
    <SkillProvider>
        <CharacterProvider charId={charId}>
          <Outlet />
        </CharacterProvider>
    </SkillProvider>
  );
}
