import { Link } from "react-router-dom";

export const NavRpg: React.FC = () => {
  return (
      <ul
        className="rpgui-list-imp"
        style={{
          gridArea: "nav"
        }}
      >
        <Link to="create">
          <li>New</li>
        </Link>
        <Link to="list">
          <li>List</li>
        </Link>
        <Link to="fight">
          <li>Fight</li>
        </Link>
      </ul>
  );
};
