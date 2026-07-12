import { Outlet } from "react-router-dom";
import {
  ButtonsLayoutProps,
  ButtonsLayoutRpg
} from "../components/Buttons/Buttons";
import { Footer } from "../components/Footer";
import { NavRpg } from "../components/Nav";

export const AppLayout: React.FC = () => {
  return (
    <div className="rpgui-content rpgui-cursor-default">
      <AppLayoutTemplate>
        <NavRpg />
        <Outlet />
        <Footer />
      </AppLayoutTemplate>
    </div>
  );
};

export const AppLayoutTemplate: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <div
      className="rpgui-container"
      style={{
        gridTemplateAreas: `
        "title title title title"
        "body body body nav"
        "body body body nav"
        "footer footer footer empty"
        `
      }}
    >
      <TitlePage />
      {children}
    </div>
  );
};

export const TitlePage: React.FC = () => {
  return (
    <div
      style={{
        gridArea: "title"
      }}
    >
      <h1>
        <span className="rpgui-icon sword" />
        <span>D&D 3.Oscar</span>
        <span className="rpgui-icon shield" />
      </h1>
    </div>
  );
};

export type PageLayoutProps = {
  title?: string;
  buttons?: ButtonsLayoutProps;
  children?: React.ReactNode;
  onAction?: () => void;
  pageStyle?: string;
};

export const PageLayoutBody: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <div
      style={{
        gridArea: "body",
        minWidth: "600px",
        maxWidth: "1900px"
      }}
      className="rpgui-container-framed"
    >
      {children}
    </div>
  );
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  buttons,
  children,
  pageStyle,
  onAction
}) => {
  const handleSubmit = () => {
    if (onAction) {
      onAction();
    }
  };
  return (
    <PageLayoutBody>
      <h1>{title}</h1>
      <ButtonsLayoutRpg
        next={buttons?.next}
        back={buttons?.back}
        create={buttons?.create}
        onAction={handleSubmit}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: pageStyle,
          gap: "0.5rem"
        }}
      >
        {children}
      </div>
      <ButtonsLayoutRpg
        next={buttons?.next}
        back={buttons?.back}
        create={buttons?.create}
        onAction={handleSubmit}
      />
    </PageLayoutBody>
  );
};
