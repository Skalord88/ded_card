import { Outlet, Link } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="create">Character creation</Link>
          </li>
          <li>
            <Link to="list">List of characters</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      </>
  );
}
