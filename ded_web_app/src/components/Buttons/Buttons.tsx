import { Link } from "react-router-dom";

export type ButtonProps = {
  change?: boolean;
  text?: string;
  link?: string;
  onAction?: () => void;
};
export const ButtonRpg: React.FC<ButtonProps> = ({ text, link, onAction }) => {
  const handleSubmit = () => {
    if (onAction) {
      onAction();
    }
  };
  return (
    <button className="rpgui-button" onClick={() => handleSubmit()}>
      {text && link ? <Link to={link}>{text}</Link> : text && <p>{text}</p>}
    </button>
  );
};

export type ButtonsLayoutProps = {
  next?: { text?: string; link?: string };
  back?: { text?: string; link?: string };
  change?: boolean;
  onAction?: () => void;
};

export const ButtonsLayoutRpg: React.FC<ButtonsLayoutProps> = ({
  next,
  back,
  change,
  onAction
}) => {
  const handleSubmit = () => {
    if (onAction) {
      onAction();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        flexDirection: "row"
      }}
    >
      {back && <ButtonRpg text={back.text} link={back.link} />}
      {change === false ? (
        <ButtonRpg text="Confirm" onAction={handleSubmit} />
      ) : (
        <ButtonRpg text={next?.text} link={next?.link} />
      )}
    </div>
  );
};
