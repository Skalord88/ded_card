import { Outlet, Link } from "react-router-dom";
import { Footer } from "./Footer";

export const AppLayout: React.FC = () => {
  return (
    <>
      <div
        className="rpgui-content rpgui-cursor-default"
        style={{ overflowY: "scroll" }}
      >
        <header></header>
        <div id="nav" className="rpgui-container-framed-golden-2">
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
        </div>
        <div id="body" className="inner rpgui-container-famed">
          <main>
            <br></br>
            <Outlet />
            <br></br>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};
