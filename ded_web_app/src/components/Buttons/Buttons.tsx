import { Link } from "react-router-dom";

export type ButtonProps = {
  text?: string;
  link?: string;
  onAction?: () => void;
};
export const ButtonConfirmRpg: React.FC<ButtonProps> = ({
  text,
  link,
  onAction
}) => {
  const handleSubmit = () => {
    if (onAction) {
      onAction();
    }
  };
  return (
    <button className="rpgui-button" onClick={() => handleSubmit()}>
      {text && <p>{text}</p>}
      {text && link && <Link to={link}>{text}</Link>}
    </button>
  );
};
