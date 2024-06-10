import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export const AppLayout: React.FC = () => {
  return (
    <>
      <div
        className="rpgui-content rpgui-cursor-default"
        style={{ overflowY: "scroll" }}
      >
        <div
          className="rpgui-container-framed"
          style={{
            width: "80%",
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <header></header>
          <div id="nav" className="rpgui-center rpgui-container-framed-golden-2">
            <nav>

              <Link to="create">
                  <button className="rpgui-button">Character creation</button>
              </Link>

              <Link to="list">
                  <button className="rpgui-button">List of characters</button>
              </Link>

              <Link to="fight">
                  <button className="rpgui-button">Fight!</button>
              </Link>

            </nav>
          </div>
          <div id="body" className="rpgui-container-famed">
            <main>
              <br></br>
              <Outlet />
              <br></br>
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
