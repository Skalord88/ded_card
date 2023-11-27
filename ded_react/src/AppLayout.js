import { Outlet, Link } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="CreateCharacter">Character creation</Link>
          </li>
          <li>
            <Link to="CharactersList">List of characters</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};