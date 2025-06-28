import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  next?: { text?: string; link?: string; change?: boolean };
  back?: { text?: string; link?: string };
  create?: boolean;
  onAction?: () => void;
};

export const ButtonsLayoutRpg: React.FC<ButtonsLayoutProps> = ({
  next,
  back,
  create,
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
        justifyContent: "space-around",
        flexDirection: "row"
      }}
    >
      {/* back */}
      <div>{back && <ButtonRpg text={back.text} link={back.link} />}</div>
      <div>
        {/* create */}
        {create && <ButtonRpg text="Confirm" onAction={handleSubmit} />}
        <ButtonRpg text="Confirm" onAction={handleSubmit} />
      </div>
      <div>
        {/* next */}
        {next?.change && <ButtonRpg text={next.text} link={next.link} />}
      </div>
    </div>
  );
};
