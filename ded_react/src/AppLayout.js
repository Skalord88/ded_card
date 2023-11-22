import { Outlet, Link } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="CharacterCreation">Character creation</Link>
          </li>
          <li>
            <Link to="CharactersList">List of characters</Link>
          </li>
          <li>
            <Link to="ClassesList">List of classes</Link>
          </li>
          <li>
            <Link to="FeatsList">List of feats</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};