<<<<<<< HEAD
=======
import React from "react";
>>>>>>> 159f5a142ac9a3c333abfcf39512c3427da522b3
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
<<<<<<< HEAD
  )
};
=======
  );
}
>>>>>>> 159f5a142ac9a3c333abfcf39512c3427da522b3
