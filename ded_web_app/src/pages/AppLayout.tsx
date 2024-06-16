import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export const AppLayout: React.FC = () => {
  return (
    <>
      <div
        className="rpgui-content rpgui-cursor-default"
        style={{
          overflowY: "scroll"
        }}
      >
        <div className="inner rpgui-container-framed">
          <header></header>
          <div
            id="nav"
            className="rpgui-center rpgui-container-framed-golden-2"
          >
            <nav>
              <Link to="create">
                <button className="rpgui-button">
                  <p>Character creation</p>
                </button>
              </Link>

              <Link to="list">
                <button className="rpgui-button">
                  <p>List of characters</p>
                </button>
              </Link>

              <Link to="fight">
                <button className="rpgui-button">
                  <p>Fight!</p>
                </button>
              </Link>
            </nav>
          </div>
          <div id="body" className="rpgui-content-framed">
            <Outlet />
            <br></br>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
