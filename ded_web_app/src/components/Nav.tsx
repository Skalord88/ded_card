import { Link } from "react-router-dom";

export const NavRpg: React.FC = () => {
  return (
    <div
      className="rpgui-container-framed-golden-2"
      style={{
        gridArea: "nav",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Link to="create">
        {/* <button className="rpgui-button"> */}
          <p>Character creation</p>
        {/* </button> */}
      </Link>

      <Link to="list">
        {/* <button className="rpgui-button"> */}
          <p>List of characters</p>
        {/* </button> */}
      </Link>

      <Link to="fight">
        {/* <button className="rpgui-button"> */}
          <p>Fight!</p>
        {/* </button> */}
      </Link>
    </div>
  );
};
