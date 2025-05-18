import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavRpg } from "../components/Nav";

export const AppLayout: React.FC = () => {
  return (
    <div className="rpgui-content rpgui-cursor-default">
      <header></header>
      <AppLayoutPc>
        <NavRpg />
        <body>
          {/* {window.innerWidth <= 730 ? (
          <AppLayoutMobile>
            <HeaderBody />
          </AppLayoutMobile>
      ) : ( */}
          {/* <AppLayoutPc> */}
          <Outlet />
          {/* </AppLayoutPc> */}
          {/* )} */}
        </body>
        <Footer />
      </AppLayoutPc>
    </div>
  );
};

// export const HeaderBody: React.FC = () => {
//   return (

//   );
// };

// export const AppLayoutMobile: React.FC<React.PropsWithChildren<{}>> = ({
//   children
// }) => {
//   return <div>{children}</div>;
// };
export const AppLayoutPc: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <div
      className="rpgui-container-framed"
      style={{
        gridTemplateAreas: `
        "body body body nav"
        "body body body nav"
        "footer footer footer"
        `,
        gridTemplateColumns: "3fr 1fr"
      }}
    >
      {children}
    </div>
  );
};

// export const PageAndSummaryLayout: React.FC<React.PropsWithChildren<{}>> = ({
//   children
// }) => {
//   return (
//     <div
//       style={{
//         border: "8px solid red",
//       }}
//     >
//       {children}
//     </div>
//   );
// };
