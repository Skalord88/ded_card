import axios from "axios";
import { Link, useParams } from "react-router-dom";

export interface ButtonText {
  url: string;
}

export const DeleteButton: React.FC<ButtonText> = ({ url }) => {
  const { charId } = useParams();

  const handleDelete = async () => {
    await axios.delete(url + "/" + charId + "/remove");
  };
  return (
    <Link to={"/list"}>
      <button
        className="rpgui-button"
        style={{ width: "100%" }}
        onClick={() => handleDelete()}
      >
        <p>DELETE</p>
      </button>
    </Link>
  );
};
