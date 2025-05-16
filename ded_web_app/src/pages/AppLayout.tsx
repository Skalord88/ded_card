import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export const AppLayout: React.FC = () => {
  return (
    <div
      className="rpgui-content rpgui-cursor-default"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      {window.innerWidth <= 780 ? (
        <div>
          <AppLayoutMobile>
            <HeaderBody />
          </AppLayoutMobile>
        </div>
      ) : (
        <div>
          <AppLayoutPc>
            <HeaderBody />
          </AppLayoutPc>
        </div>
      )}
    </div>
  );
};

export const HeaderBody: React.FC = () => {
  return (
    <div className="rpgui-container-framed">
      <header></header>
      <nav id="nav" className="rpgui-center rpgui-container-framed-golden-2">
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
      <div id="body" className="rpgui-content-framed">
        <br></br>
        <Outlet />
        <br></br>
        <Footer />
      </div>
    </div>
  );
};

export const AppLayoutMobile: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return <div className="mobile-scale">{children}</div>;
};
export const AppLayoutPc: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return <div style={{
        margin: "auto",
        padding: "10px 200px"

    }}>{children}</div>;
};
