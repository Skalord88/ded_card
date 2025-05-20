import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavRpg } from "../components/Nav";
import {
  ButtonsLayoutProps,
  ButtonsLayoutRpg
} from "../components/Buttons/Buttons";

export const AppLayout: React.FC = () => {
  return (
    <AppLayoutTemplate>
      {/* <header></header> */}
      <NavRpg />
      <Outlet />
      <Footer />
    </AppLayoutTemplate>
  );
};

export const AppLayoutTemplate: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <div
      className="rpgui-content rpgui-cursor-default"
      style={{
        display: "grid",
        gridTemplateAreas: `
        "body body body nav"
        "body body body nav"
        "footer footer footer empty"
        `,
        gridTemplateColumns: "3fr, 1fr",
        minWidth: "min-content"
      }}
    >
      {children}
    </div>
  );
};

export type PageLayoutProps = {
  title: string;
  buttons: ButtonsLayoutProps;
  children?: React.ReactNode;
  onAction?: () => void;
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  buttons,
  children,
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
        gridArea: "body"
      }}
      className="rpgui-container-framed"
    >
      <h1>{title}</h1>
      <ButtonsLayoutRpg
        next={buttons.next}
        back={buttons.back}
        change={buttons.change}
        onAction={handleSubmit}
      />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          gap: "5px",
          flexWrap: "wrap"
        }}
      >
        {children}
      </div>
      <ButtonsLayoutRpg
        next={buttons.next}
        back={buttons.back}
        change={buttons.change}
        onAction={() => handleSubmit}
      />
    </div>
  );
};
