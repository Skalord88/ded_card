import { Link } from "react-router-dom";

export const NavRpg: React.FC = () => {
  return (
    <div
      className="rpgui-container-framed golden-2"
      style={{
        gridArea: "nav",
        alignSelf: "flex-start",
      }}
    >
      <Link to="create">
        <p>New</p>
      </Link>
      <Link to="list">
        <p>List</p>
      </Link>
      <Link to="fight">
        <p>Fight</p>
      </Link>
    </div>
  );
};
