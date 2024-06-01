import { Outlet, Link } from "react-router-dom";
import { Footer } from "./Footer";

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
            marginRight: "auto",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: "auto",
            minWidth: "40%"
          }}
        >
          <header></header>
          <div id="nav" className="rpgui-center rpgui-container-framed-golden-2">
            <nav>
              <Link to="create">
                <button className="rpgui-button" style={{ width: "32%" }}>
                  <p>Character creation</p>
                </button>
              </Link>

              <Link to="list">
                <button className="rpgui-button" style={{ width: "32%" }}>
                  <p>List of characters</p>
                </button>
              </Link>

              <Link to="list">
                <button className="rpgui-button" style={{ width: "32%" }}>
                  <p>Fight!</p>
                </button>
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
